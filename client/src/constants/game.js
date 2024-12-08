export const GameData = [
  {
    storyId: 2,
    storyTitle: "Echoes of the Forgotten Realm",
    storyDescription: `Welcome, adventurer. The ancient kingdom of Eldara is in peril. Dark forces seek to reunite the shards of the Ethereal Core, a magical artifact of untold power. As the last descendant of the Ethereal Keepers, the burden to restore balance falls upon you. Brace yourself for a journey through perilous lands, forgotten ruins, and shadowy enemies. Will you emerge as the hero Eldara needs, or succumb to the darkness?`,
    chapters: [
      {
        chapterId: 1,
        chapterTitle: "The Call to Adventure",
        chapterDescription:
          "Begin your journey in the humble village of Greenwood.",
        isCompleted: false,
        isActive: true,
        levels: [
          {
            levelId: 1,
            levelTitle: "The Village of Greenwood",
            levelMessage: "The quiet before the storm.",
            scene: [
              {
                sceneId: 1,
                sceneMessage:
                  "The village elder summons you to the town square. A strange glow emanates from the forest to the north.",
                sceneOptions: [
                  {
                    look: "The elder's eyes are filled with worry. The map you hold feels heavier with each passing moment.",
                    north: 2,
                    east: 3,
                    attack: [],
                  },
                ],
              },
              {
                sceneId: 2,
                sceneMessage:
                  "The forest path is eerie, with glowing mushrooms lighting the way. You hear whispers that chill your spine.",
                sceneOptions: [
                  {
                    look: "A shadow moves in the trees. Are you being watched?",
                    west: 1,
                    attack: [
                      {
                        monsterId: 1,
                        monsterName: "Forest Wraith",
                        monsterHealth: 70,
                        monsterDamage: 10,
                        attackMessage:
                          "The Forest Wraith emerges, its translucent form darting between the trees.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 3,
                sceneMessage:
                  "A derelict shrine stands in a clearing, its runes glowing faintly. Something powerful resides here.",
                sceneOptions: [
                  {
                    look: "The runes tell a story of a battle long forgotten.",
                    east: 2,
                    west: 4,
                    attack: [
                      {
                        monsterId: 2,
                        monsterName: "Shrine Guardian",
                        monsterHealth: 100,
                        monsterDamage: 15,
                        attackMessage:
                          "The Shrine Guardian awakens, its stone fists raised.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 4,
                sceneMessage:
                  "The edge of the forest opens into a vast meadow. A storm brews on the horizon.",
                sceneOptions: [
                  {
                    look: "The storm feels unnatural, as though summoned by something sinister.",
                    west: 5,
                    attack: [],
                  },
                ],
              },
              {
                sceneId: 5,
                sceneMessage:
                  "You’ve completed Chapter 1. Type 'start' to enter Chapter 2.",
                sceneOptions: [
                  {
                    look: "Type 'start' to proceed to the next chapter.",
                    startNewChapter: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        chapterId: 2,
        chapterTitle: "Whispering Woods",
        chapterDescription: "Face the dangers lurking in the forest depths.",
        isCompleted: false,
        isActive: false,
        levels: [
          {
            levelId: 1,
            levelTitle: "The Whispering Woods",
            levelMessage: "Every shadow hides a threat.",
            scene: [
              {
                sceneId: 1,
                sceneMessage:
                  "The deeper you go, the thicker the mist becomes. Voices whisper your name.",
                sceneOptions: [
                  {
                    look: "The mist swirls unnaturally. You can barely see the path ahead.",
                    north: 2,
                    west: 3,
                    attack: [
                      {
                        monsterId: 3,
                        monsterName: "Mist Wraith",
                        monsterHealth: 90,
                        monsterDamage: 12,
                        attackMessage:
                          "The Mist Wraith materializes, its tendrils reaching for you.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 2,
                sceneMessage:
                  "A broken bridge lies ahead. You hear growls from the ravine below.",
                sceneOptions: [
                  {
                    look: "The bridge creaks as you approach. Something is moving in the darkness below.",
                    west: 1,
                    attack: [
                      {
                        monsterId: 4,
                        monsterName: "Ravine Beast",
                        monsterHealth: 120,
                        monsterDamage: 18,
                        attackMessage:
                          "The Ravine Beast leaps from the shadows, its claws glinting in the moonlight.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 3,
                sceneMessage:
                  "A grove of ancient trees stands before you, their roots pulsating with energy.",
                sceneOptions: [
                  {
                    look: "The grove seems alive, as though watching your every move.",
                    east: 2,
                    north: 4,
                    attack: [
                      {
                        monsterId: 5,
                        monsterName: "Ancient Treant",
                        monsterHealth: 150,
                        monsterDamage: 25,
                        attackMessage:
                          "The Ancient Treant awakens, its massive limbs crashing towards you.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 4,
                sceneMessage:
                  "You’ve reached the forest's heart. The fragment of the Ethereal Core is within reach.",
                sceneOptions: [
                  {
                    look: "The fragment glows with a light that drives the shadows back.",
                    attack: [
                      {
                        monsterId: 6,
                        monsterName: "Shadow Guardian",
                        monsterHealth: 200,
                        monsterDamage: 30,
                        attackMessage:
                          "The Shadow Guardian emerges, its blade shimmering with dark energy.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
