import React, { useState, useEffect, useRef } from 'react';
import Music from '../assets/Lord Huron  The Night We Met Official Audio.mp3' 
import CSHall from '../assets/CSHall.png'
import CS_S6R1 from '../assets/CS_S6R1.png'
import GirlsBathroom from '../assets/GirlsBathroom.png'

const Map = ({ currentRoom }) => {

    const renderMap = (room) => {
      
      switch (room) {

        case 'CS_S6R1':
          return (
            <pre className='text-[120%]'>
              {`[ CS S6R1 ]`}
            </pre>
          );

        case 'CSHall':
          return (
            <>
            <div className='flex items-center'>
            <pre className='text-[120%]'>
              {`[ CS Hall ]`}
            </pre>
            <a className='text-[50%]'>
            {'\u2190 [ CS_S6R1 ]'}
            </a>
            </div>
            </>
          );

          case 'CSHallTop':
          return (
            <>
            <div className=''>
            <pre className='text-[80%]'>
            {`[ CS Ha2sll - Floor 2 - Top ]`}
            </pre>
            <pre className='text-[50%]'>
{`    \u2191
[ CS Hall - Floor 2 ] \u2190 [ CS_S6R1 ]`}
</pre>
            
            </div>
            </>
          );

          case 'GirlsBathroom':
          return (
            <pre>
              {`[ Girls Bathroom ] - [ CS Hall - Floor 2 ] - [ CS_S6R1 ]`}
            </pre>
          );

          case 'CSHallBottom':
          return (
            <>
            <pre className='text-[60%]'>
              {`[ CS Hall - Floor 2 ] \u2190 [ CS_S6R1 ]
    \u2193       `}</pre>
            <pre className='text-[160%]'>
            {`[ CS Hall - Floor 2 - Bottom]`}
            </pre>
            </>
          );

          case 'CSHallBottom2':
            return (
              <>      
               <pre>
                {`[ CS Hall - Floor 2 ] \u2190 [ CS_S6R1 ]
      \u2193
[ CS Hall - Floor 2 - Bottom]
      \u2193`}
              </pre>
              <pre className='text-[160%]'>
            {`[ CS Hall - Floor 2 - Bottom]`}
            </pre>
              </>
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
      <>
      <div className='max-w-[100%] h-[100%] flex flex-col justify-center items-center'>
        <h2 className='text-[60%]'>Map</h2>
        {renderMap(currentRoom)}
        
        <div className='absolute mt-[40%] mr-[30%]'>
        <p className='text-center text-[60%]'>You are currently in: {currentRoom}</p>
        </div>
      </div>
      </>
    );
  };

  
  
const Game = () => {
  const [currentRoom, setCurrentRoom] = useState('CS_S6R1');
  const [message, setMessage] = useState('\"Type Look To wake up and view Your Surroundings\"');
  const [clockTime, setClockTime] = useState('9:00');
  const [inventory, setInventory] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null)
  const [enemy, setEnemy] = useState({ present: true, health: 110 });
  const [isAttacked, setIsAttacked] = useState(false); 
  const [userHealth, setUserHealth] = useState(100);
  const [isMapOpen, setIsMapOpen] = useState(false); 
  


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



  const Enemy = ({ health }) => {
    return (
      <div className="">
        <div className='bg-gray-300 mt-2'>
        <div className="bg-red-600 w-10 h-1" style={{ width: `${health}%` }}></div>
        
        </div>
        <p>Enemy Health: {health}</p>
      </div>
    );
  };



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
          

        case 'attack':
          if (currentRoom === 'CSHall' && enemy.present) {
          setIsAttacked(true);
          const newEnemyHealth = enemy.health - 10;
          setEnemy((prevEnemy) => ({
          ...prevEnemy,
          health: newEnemyHealth < 0 ? 0 : newEnemyHealth,
          }));
          setMessage('I wish i didnt have to kill her, she may not have been a good teacher but... yeah some things are just wrong to do, no buts. I should probably LOOK around this place.');
          if (newEnemyHealth <= 0) {
            setIsAttacked(false);
            setEnemy({ present: false, health: 0 });
          } else {
            setIsAttacked(true);
          }
          } else {
          setMessage('I already killed her, what should i attack a dead body now? i should probably LOOK around to find a way out of this hell.');
          }
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
          let directionsCount = 0;
          if (command.includes('north')) {
            newRoom = getExit(currentRoom, 'north');
            directionsCount = directionsCount+1;
          }
          if (command.includes('south')) {
            newRoom = getExit(currentRoom, 'south');
            directionsCount = directionsCount+1;
          }
          if (command.includes('east')) {
            newRoom = getExit(currentRoom, 'east');
            directionsCount = directionsCount+1;
          }
          if (command.includes('west')) {
            newRoom = getExit(currentRoom, 'west');
            directionsCount = directionsCount+1;
          }

          if (directionsCount === 0) {
            setMessage('Invalid command. Try again!');
          } else if (directionsCount > 1) {
            setMessage('You can\'t travel in multiple directions at he same time.');
          } else {
            newMessage = '';
          }
          break;
      }


      if (newRoom !== currentRoom) {
        setCurrentRoom(newRoom);
        setMessage(getRoomDescription(newRoom));
        const [hours, minutes] = clockTime.split(':');
        let newMinutes = parseInt(minutes) + 2;

        if (newRoom === 'CSHall' && enemy.present === true) {
          setMessage('\nWhat The... Is that keert... What happened to her. She looks like a freaking zombie...(Stepped on glass) Ah shit... she saw me... she\'s coming towards me, i always wanted to beat my teachers but i didnt expect things to go this way. should i ATTACK? ');
        }else{
          setMessage(getRoomDescription(newRoom));
        }

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

  const toggleMap = () => {
    setIsMapOpen(!isMapOpen);
  };


  const handleAttack = () => {
    const newEnemyHealth = enemy.health - 10;
    setEnemy((prevEnemy) => ({
      ...prevEnemy,
      health: newEnemyHealth < 0 ? 0 : newEnemyHealth,
    }));
    if (newEnemyHealth <= 0) {
      setIsAttacked(false);
      if (enemy.present && newEnemyHealth <= 0) {
        setIsAttacked(false);
        setEnemy({ present: false, health: 0 });
    }
  };}


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
      CS_S6R1: "Ah... What happened. Where am i. Is this my Classroom? Where is everybody? ah... My head hurts. The fuck, its 9:00 PM, HOW THE FUCK DID I EVEN GET HERE THIS FUCKING LATE? I gotta go home, i see a door to my WEST, let me check if its open.",
      CSHall: 'Hmm, so this is what my floor looks like at night. Everything looks so... spooky. Anyway i see a door to my WEST and the door i came through, in the EAST. Should i explore the college at night or just leave this god forsaken place before another teacher decides to give me a bad grade. I could also go either SOUTH or NORTH the hall.',
      CSHallTop: 'I\'ve never truely noticed these walls, they look so medieval, its either that or just the lack of daylight thats making it feel...different. I\'ve reached the end of this path, i could go upstairs to check if anyones here or not, actually i\'d rather not search for people after what i just witnessed. I could also go downstairs and Leave. ',
      CSHallBottom: 'I wanna just run as fast as i can, but i cant, my legs they just dont wanna move that fast... its actually better to walk, who knows which teacher is gonna just jump out of a corner and... Wait a minute, i could take this as an opportunity, I could use the computer in the staff room to change my grades. if i remember correctly the staff room is down SOUTH.',
      CSHallBottom2: "You're almost there. head East to enter the staff room.",
      StaffRoom: "you have entered the Staff Room. You could look around and search for items to collect.",
      GirlsBathroom: "God Damn it stinks here, i thought the girls bathroom was the last place to be this stinky. oh wait why am i here? if anyone sees me here, ill probably be called a prev for the rest of my life, i should head back EAST. ",
    };

    return descriptions[room] || 'You are in an unknown place.';
  };


  let backgroundImage;
  switch (currentRoom) {
    case 'CSHall':
      backgroundImage = CSHall;
      break;
    case 'CS_S6R1':
      backgroundImage = CS_S6R1;
      break;
    case 'GirlsBathroom':
      backgroundImage = GirlsBathroom;
      break;
    case 'CSHallTop':
      backgroundImage = CSHall;
    break;
    case 'CSHallBottom':
      backgroundImage = CSHall;
    break;
    case 'CSHallBottom2':
      backgroundImage = CSHall;
    break;
    default:
      break;
  }





  return (
    <>
    
    
    <div className='absolute flex justify-center items-center flex-col w-full h-screen bg-black  text-slate-50'>
    <div
      className="w-[70%] bg-no-repeat h-[20%] mb-[5%]"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'contain' }}
      ><h1></h1></div>
    
    {isAttacked && (
        <div className="text-white bg-black/80 w-full h-screen absolute flex flex-col justify-center items-center">
          <div className="bg-white w-[50%] text-black text-center justify-center items-center flex flex-col h-[20%] rounded-2xl">
            <p>kill her before she attacks you. </p>
            {enemy.present && <Enemy health={enemy.health} />}
            <button className='bg-black mt-3 text-white pt-2 pb-2 pl-4 pr-4 rounded-xl mr-3' onClick={handleAttack}>Attack</button>
          </div>
        </div>
      )}
     


      {showInventory && (
        <div className="text-white bg-black/80 w-full h-screen absolute flex flex-col justify-center items-center ">

        <div className='bg-white w-[50%] text-black text-center justify-center items-center flex flex-col h-[20%] rounded-2xl'>
          <h2><strong>INVENTORY</strong></h2>
          <ul>
            {inventory.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </div>
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


      {/* <div className='absolute lg:mb-[25%] lg:ml-[40%] mb-[90%] ml-[30%]'>
      <img src={wall} className='object-cover lg:w-[20%] w-[60%]'/>
      </div> */}
       
      <div className='mb-14 flex items-center flex-col'>
      <h1 className='text-[200%]'>The Haunted College</h1>
      <p className='lg:ml-[30%] lg:mr-[30%] ml-[10%] text-center mb-4 mr-[10%]'>{message}</p>
      <input type="text" placeholder='Look | Search | North | South | East | West | ETC' className='text-black lg:w-[15%]' onKeyPress={handleInput} autoFocus />
      </div>

      {/* <div className='mt-5'>
        <h1 className=''>Options: Look | Search | North | South | East | West</h1>
        </div> */}
        
    </div>

    
    
    {isMapOpen && (
    <div className=' flex flex-col justify-center items-end w-full h-[30%] absolute text-white'>
      <p className='flex justify-end mt-14 mr-5 w-full text-[60%]'>Current Time: {clockTime}</p>
      <div className='bg-gray-800/50 w-[65%] h-[120%] items-center mr-5'>
      <Map currentRoom={currentRoom} />
      </div>
    </div>
    )}

<div className='w-full absolute flex justify-end'>
    <button className='bg-white text-black pt-1 pb-1 pl-2 pr-2 mt-4 rounded-3xl mr-3' onClick={toggleMap}>{isMapOpen ? 'Close Map' : 'Open Map'}</button>
    </div>
    
    
</>
  );
};

export default Game;
