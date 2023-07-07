import React, { useState, useEffect, useRef } from 'react';
import Music from '../assets/Lord Huron  The Night We Met Official Audio.mp3'
import wall from '../assets/wall3.jpg'

const Map = ({ currentRoom }) => {

    const renderMap = (room) => {
      
      switch (room) {

        case 'CS_S6R1':
          return (
            <pre>
              {`[ CS S6R1 ]`}
            </pre>
          );

        case 'CSHall':
          return (
            <pre>
              {`[ CS Hall - Floor 2 ] - [ CS_S6R1 ]`}
            </pre>
          );

          case 'CSHallTop':
          return (
            <pre>
              {`[ CS Ha2sll - Floor 2 - Top ]
    |
[ CS Hall - Floor 2 ] - [ CS_S6R1 ]`}
            </pre>
          );

          case 'GirlsBathroom':
          return (
            <pre>
              {`[ Girls Bathroom ] - [ CS Hall - Floor 2 ] - [ CS_S6R1 ]`}
            </pre>
          );

          case 'CSHallBottom':
          return (
            <pre>
              {`[ CS Hall - Floor 2 ] - [ CS_S6R1 ]
    |
[ CS Hall - Floor 2 - Bottom]`}
            </pre>
          );

          case 'CSHallBottom2':
            return (
              <pre>
                {`[ CS Hall - Floor 2 ] - [ CS_S6R1 ]
      |
[ CS Hall - Floor 2 - Bottom]
      |
[ CS Hall - Floor 2 - Bottom]`}
              </pre>
            );

            case 'StaffRoom':
            return (
              <pre>
                {`[ CS Hall - Floor 2 ] - [ CS_S6R1 ]
      |
[ CS Hall - Floor 2 - Bottom]
      |
[ CS Hall - Floor 2 - Bottom] - [ CS Staff Room ]`}
              </pre>
            );

        default:
          return null;
      }
    };
  
    return (
      <div className='max-w-[100%] h-[100%] overflow-hidden text-[50%] mr-3'>
        <h2>Map</h2>
        {renderMap(currentRoom)}
        <p>You are currently in: {currentRoom}</p>
      </div>
    );
  };
  
const Game = () => {
  const [currentRoom, setCurrentRoom] = useState('CS_S6R1');
  const [message, setMessage] = useState('');
  const [clockTime, setClockTime] = useState('9:00');
  const [inventory, setInventory] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null)


  useEffect(() => {
    const interval = setInterval(() => {
      const [hours, minutes] = clockTime.split(':');
      let newMinutes = parseInt(minutes) + 2;

      if (newMinutes >= 60) {
        const newHours = parseInt(hours) + Math.floor(newMinutes / 60);
        newMinutes = newMinutes % 60;
        setClockTime(`${newHours}:${String(newMinutes).padStart(2, '0')}`);
      } else {
        setClockTime(`${hours}:${String(newMinutes).padStart(2, '0')}`);
      }
    }, 1000 * 60 * 2);

    return () => clearInterval(interval);
  }, [clockTime]);



  const handleInput = (event) => {

    if (event.key === 'Enter') {
      const command = event.target.value.toLowerCase().trim();
      let newRoom = currentRoom;
      let newMessage = '';

      switch (command) {
        case 'look':
          setMessage(getRoomDescription(currentRoom));
          break;
        case 'north':
          newRoom = getExit(currentRoom, 'north');
          break;
        case 'south':
          newRoom = getExit(currentRoom, 'south');
          break;
        case 'east':
          newRoom = getExit(currentRoom, 'east');
          break;
        case 'west':
          newRoom = getExit(currentRoom, 'west');
          break;
        case 'quit':
          setMessage('Game over. Thanks for playing!');
          break;
          case 'search':
            if (currentRoom === 'StaffRoom') {
              if (inventory.includes('Question Paper')) {
                setMessage('There is nothing to search here.');
              } else {
                setShowPopUp(true);
              }
            } else {
              setMessage('There is nothing to search here.');
            }
            break;
          case 'collect':
            if (currentRoom === 'StaffRoom') {
              if (inventory.includes('Question Paper')) {
                setMessage('You already have a Question Paper in your inventory.');
                setShowPopUp(false);
              } else {
                setInventory([...inventory, 'Question Paper']);
                setMessage('You collected a Question Paper and it has been added it to your inventory.');
                setShowPopUp(false);
              }
            } else {
              setMessage('There is nothing to collect here.');
            }
            break;
          case 'walk away':
            setShowPopUp(false);
            newMessage = 'You decided to walk away.';
            break;
          case 'inventory':
          setShowInventory(!showInventory);
          newMessage = showInventory ? 'Closed inventory.' : 'Opened inventory.';
          break;

        default:
          setMessage('Invalid command. Try again!');
          break;
      }

      if (newRoom !== currentRoom) {
        setCurrentRoom(newRoom);
        setMessage(getRoomDescription(newRoom));
        const [hours, minutes] = clockTime.split(':');
        let newMinutes = parseInt(minutes) + 2;

        if (newMinutes >= 60) {
          const newHours = parseInt(hours) + Math.floor(newMinutes / 60);
          newMinutes = newMinutes % 60;
          setClockTime(`${newHours}:${String(newMinutes).padStart(2, '0')}`);
        } else {
          setClockTime(`${hours}:${String(newMinutes).padStart(2, '0')}`);
        }
      }

      event.target.value = '';
    }
  };


  const handleButtonClick = () => {
    setShowInventory(!showInventory);
  };


  const handleMusic = () => {
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };



  const getExit = (room, direction) => {
    // Define the exits for each room
    const exits = {
      CS_S6R1 : { west: 'CSHall' },
      CSHall: { east: 'CS_S6R1', south: 'CSHallBottom', north:'CSHallTop', west: 'GirlsBathroom' },
      CSHallTop: { south: 'CSHall' },
      CSHallBottom: { north: 'CSHall', south: 'CSHallBottom2' },
      CSHallBottom2: { north: 'CSHallBottom', east: 'StaffRoom'},
      StaffRoom: { west: 'CSHallBottom2' },
      GirlsBathroom: { east: 'CSHall' }
    };

    // Check if the given room has an exit in the specified direction
    if (exits[room] && exits[room][direction]) {
      return exits[room][direction];
    }

    setMessage('You cannot go that way!');
    return room;
  };



  const getRoomDescription = (room) => {
    // Define the descriptions for each room
    const descriptions = {
      CS_S6R1: "You are in the class CS S6R1. You woke up here after you're final exam. Whilist writing your exam you fell unconscious and woke up here. Its currently 9:00pm. You see a door towards West. ",
      CSHall: 'You are in the CS Depts Hall. There is a door towards your East and West. You can also follow the path up north the hall or go down south the hall.',
      CSHallTop: 'You can either go up-stairs or down-stairs from here. If neither then head back south.',
      CSHallBottom: 'You can enter the staff room, Located South-East or You can go down-stairs or up-stairs.',
      CSHallBottom2: "You're almost there. head East to enter the staff room.",
      StaffRoom: "you have entered the Staff Room. You could look around and search for items to collect.",
      GirlsBathroom: "I know you are the only one in the college right now but is it okay to go sneaking into the girls bathroom, if you're not a girl please leave the area you perv.",
    };

    return descriptions[room] || 'You are in an unknown place.';
  };



  return (
    <>
    
    <div className='absolute flex justify-center items-center flex-col w-full h-screen overflow-hidden bg-black text-slate-50'>
    

      {showInventory && (
        <div className="text-white bg-black/80 w-full h-screen absolute flex flex-col justify-center items-center ">

          <h2><strong>INVENTORY</strong></h2>
          <ul>
            {inventory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {showPopUp && (
          <div className="text-black bg-black/80 w-full h-screen absolute flex flex-col justify-center items-center text-center">
            <div className='absolute bg-white w-[60%] h-[20%] flex flex-col justify-center items-center  ml-[20%] mr-[20%] rounded-2xl'>
            <p>You found a Question Paper!</p>
            <p>Do you want to collect the Question Paper or walk away?</p>
            <button className='cursor-pointer mt-5' onClick={() => handleInput({ key: 'Enter', target: { value: 'collect' } })}>Collect</button>
            <button className='cursor-pointer' onClick={() => handleInput({ key: 'Enter', target: { value: 'walk away' } })}>Walk Away</button>
            </div>
          </div>
      )}
      <div className=' absolute flex mt-[770px] justify-center items-end mb-7'>
          <button className='bg-white text-black pt-2 pb-2 pl-4 pr-4 rounded-3xl mr-3' onClick={handleButtonClick}>inventory</button>
          <button className='bg-white text-black pt-2 pb-2 pl-4 pr-4 rounded-3xl' onClick={handleMusic}>
          {isMusicPlaying ? 'Pause Music' : 'Play Music'}
          </button>
          <audio ref={audioRef} src={Music} />
        </div>
      

      <h1 className='text-[200%] mb-5'>The Haunted College</h1>
      <p className='ml-[10%] text-center mb-4 mr-[10%]'>{message}</p>
      <input type="text" className='text-black' onKeyPress={handleInput} autoFocus />

      <div className='mt-5'>
        <h1 className=''>Options: Look | Search | North | South | East | West</h1>
        </div>
        
    </div>
    

    <div className=' flex flex-col items-end w-full h-[20%] absolute text-white'>
      <p className='mr-9 text-[50%]'>Current Time: {clockTime}</p>
      <Map className='' currentRoom={currentRoom} />
    </div>
    
</>
  );
};

export default Game;
