import Chapter from "../model/chapter.js";
import Character from "../model/character.js";
import character from "../model/character.js";
import Level from "../model/level.js";
import Monster from "../model/monster.js";
import Scene from "../model/scene.js";
import SceneOption from "../model/sceneOptions.js";
import Story from "../model/story.js";

export const insertGameData = async (req, res) => {
  try {
    const charactersData = [
      {
        name: "Max the Developer",
        health: 100,
        attackPower: 15,
        specialAbility: "Debugging Shockwave",
        description: "A seasoned developer who fights with logic and a laptop.",
        avatar: "https://example.com/avatar1.png",
      },
      {
        name: "Zara the Designer",
        health: 80,
        attackPower: 10,
        specialAbility: "Creative Flare",
        description:
          "A designer with an eye for detail and sharp design tools.",
        avatar: "https://example.com/avatar2.png",
      },
      {
        name: "Ethan the Manager",
        health: 120,
        attackPower: 20,
        specialAbility: "Strategic Overhaul",
        description:
          "A manager who excels at planning and motivating the team.",
        avatar: "https://example.com/avatar3.png",
      },
    ];
    const testCharacter = await Character.create({
      name: "Test Character",
      health: 100,
      attackPower: 10,
      description: "Test description",
    });

    const insertedCharacters = await character.insertMany(charactersData);

    const monstersData = [
      {
        monsterName: "Zombie Janitor",
        monsterHealth: 100,
        monsterDamage: 15,
        attackMessage:
          "A decayed figure steps out with a mop, its eyes vacant and hungry.",
      },
      {
        monsterName: "Zombie Developer",
        monsterHealth: 80,
        monsterDamage: 20,
        attackMessage:
          "The Zombie Developer slams against the glass, growling in frustration.",
      },
      {
        monsterName: "Zombie Office Worker",
        monsterHealth: 120,
        monsterDamage: 25,
        attackMessage:
          "The Zombie Office Worker lunges with unnatural speed, its nails scraping at you.",
      },
      {
        monsterName: "Zombie CEO",
        monsterHealth: 150,
        monsterDamage: 30,
        attackMessage:
          "The Zombie CEO stands in the doorway, blocking your escape with a growl.",
      },
      {
        monsterName: "Zombie Accountant",
        monsterHealth: 100,
        monsterDamage: 18,
        attackMessage:
          "The Zombie Accountant swings a calculator at you like a club.",
      },
      {
        monsterName: "Zombie Intern",
        monsterHealth: 60,
        monsterDamage: 15,
        attackMessage:
          "The Zombie Intern claws at you, blood staining its hands.",
      },
      {
        monsterName: "Zombie Pilot",
        monsterHealth: 250,
        monsterDamage: 50,
        attackMessage:
          "The Zombie Pilot slams a chair at you with terrifying force.",
      },
    ];

    const insertedMonsters = await Monster.insertMany(monstersData);

    const sceneOptionsData = [
      {
        look: "Looking outside the window, You see the pretty lights of tokyo city. Life is really beautiful Max, you should spend it outside at times.",
        west: 2,
        north: 4,
        attack: [insertedMonsters[0]._id],
      },
      {
        look: "The stairwell door is ajar, but the elevator shaft is dark. Something stirs inside.",
        west: 3,
        east: 1,
        attack: [insertedMonsters[1]._id],
      },
      {
        look: "As you approach, a body emerges from behind a shelf, its mouth open in silent horror.",
        east: 2,
        west: 4,
        attack: [insertedMonsters[2]._id],
      },
      {
        look: "A flickering monitor shows distorted images of the office. The door trembles as something tries to break in.",
        west: 5,
        attack: [insertedMonsters[3]._id],
      },
      {
        look: "type 'start' to enter chapter 2",
        startNewChapter: 2,
      },
    ];

    const insertedSceneOptions = await SceneOption.insertMany(sceneOptionsData);

    const sceneData = [
      {
        sceneMessage:
          "Working late as usual I see, say max, how does it feel to be all alone in a office? Is working this much really necessary? Look out your window for a change.",
        sceneOptions: [insertedSceneOptions[0]._id],
      },
      {
        sceneMessage:
          "A red emergency light casts an eerie glow. You see your former coworker, now a zombie, staggering towards you.",
        sceneOptions: [insertedSceneOptions[1]._id],
      },
      {
        sceneMessage:
          "The library is a mess, books scattered on the floor. A faint glow catches your eye – a red notebook under old magazines.",
        sceneOptions: [insertedSceneOptions[2]._id],
      },
      {
        sceneMessage:
          "The conference room is eerily silent. An overturned table and the distant sound of tapping at the door. Zombies shuffle outside.",
        sceneOptions: [insertedSceneOptions[3]._id],
      },
      {
        sceneMessage:
          "You’ve completed chapter 1. Type 'start' to continue to chapter 2.",
        sceneOptions: [insertedSceneOptions[4]._id],
      },
    ];

    const insertedScenes = await Scene.insertMany(sceneData);

    const levelData = [
      {
        levelId: 1,
        levelTitle: "21st Floor",
        levelMessage: "Alone And Alive.",
        scene: [
          insertedScenes[0]._id,
          insertedScenes[1]._id,
          insertedScenes[2]._id,
          insertedScenes[3]._id,
          insertedScenes[4]._id,
        ],
      },
    ];

    const insertedLevels = await Level.insertMany(levelData);

    const chapterData = [
      {
        chapterId: 1,
        chapterTitle: "Production Failed.",
        chapterDescription: "Lifeless Life.",
        isCompleted: false,
        isActive: true,
        levels: [insertedLevels[0]._id],
      },
    ];

    const insertedChapters = await Chapter.insertMany(chapterData);

    const storyData = {
      storyId: 1,
      storyTitle: "Haunted Office",
      storyDescription:
        "Hello Max, loyal servant of FinTech, does working late, alone, at the top most floor of your building not scare you? Aren't you afraid of whats lurking outside. Well tonight is not gonna be like most nights, this night might as well be your last night... Who am I you ask, well consider me as your only ray of hope to get pass, well... corporate HELL.",
      chapters: [insertedChapters[0]._id],
      characters: insertedCharacters.map((char) => char._id),
    };

    const insertedStory = await Story.create(storyData);

    res.status(200).json(insertedStory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
