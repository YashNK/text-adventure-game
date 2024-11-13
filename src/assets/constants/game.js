export const GameData = [
  {
    storyId: 1,
    storyTitle: "Haunted Office",
    storyDescription: `Hello Max, loyal servant of FinTech, does working late, alone, at the top most floor of your building not scare you? Aren't you afraid of whats lurking outside.
    Well tonight is not gonna be like most nights, this night might as well be your last night...
    Who am I you ask, well consider me as your only ray of hope to get pass, well... corporate HELL. Ill be guiding you through each floor of your building, don't consider me as a merciful companion, I wont be taking any sides, its your journey, your hell, I'm just here to make sure you don't get lost in the chaos. My name is Echo.`,
    chapters: [
      {
        chapterId: 1,
        chapterTitle: "Production Failed.",
        chapterDescription: "Lifeless Life.",
        isCompleted: false,
        isActive: true,
        levels: [
          {
            levelId: 1,
            levelTitle: "21st Floor",
            levelMessage: "Alone And Alive.",
            scene: [
              {
                sceneId: 1,
                sceneMessage:
                  "Working late as usual I see, say max, how does it feel to be all alone in a office? Is working this much really necessary? Look out your window for a change.",
                sceneOptions: [
                  {
                    look: "Looking outside the window, You see the pretty lights of tokyo city. Life is really beautiful Max, you should spend it outside at times.",
                    west: 2,
                    north: 4,
                    attack: [
                      {
                        monsterId: 1,
                        monsterName: "Zombie Janitor",
                        monsterHealth: 100,
                        monsterDamage: 15,
                        attackMessage:
                          "A decayed figure steps out with a mop, its eyes vacant and hungry.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 2,
                sceneMessage:
                  "A red emergency light casts an eerie glow. You see your former coworker, now a zombie, staggering towards you.",
                sceneOptions: [
                  {
                    look: "The stairwell door is ajar, but the elevator shaft is dark. Something stirs inside.",
                    west: 3,
                    east: 1,
                    attack: [
                      {
                        monsterId: 2,
                        monsterName: "Zombie Developer",
                        monsterHealth: 80,
                        monsterDamage: 20,
                        attackMessage:
                          "The Zombie Developer slams against the glass, growling in frustration.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 3,
                sceneMessage:
                  "The library is a mess, books scattered on the floor. A faint glow catches your eye – a red notebook under old magazines.",
                sceneOptions: [
                  {
                    look: "As you approach, a body emerges from behind a shelf, its mouth open in silent horror.",
                    east: 2,
                    west: 4,
                    attack: [
                      {
                        monsterId: 3,
                        monsterName: "Zombie Office Worker",
                        monsterHealth: 120,
                        monsterDamage: 25,
                        attackMessage:
                          "The Zombie Office Worker lunges with unnatural speed, its nails scraping at you.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 4,
                sceneMessage:
                  "The conference room is eerily silent. An overturned table and the distant sound of tapping at the door. Zombies shuffle outside.",
                sceneOptions: [
                  {
                    look: "A flickering monitor shows distorted images of the office. The door trembles as something tries to break in.",
                    west: 5,
                    attack: [
                      {
                        monsterId: 4,
                        monsterName: "Zombie CEO",
                        monsterHealth: 150,
                        monsterDamage: 30,
                        attackMessage:
                          "The Zombie CEO stands in the doorway, blocking your escape with a growl.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 5,
                sceneMessage:
                  "You’ve completed chapter 1. Type 'start' to continue to chapter 2.",
                sceneOptions: [
                  {
                    look: "type 'start' to enter chapter 2",
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
        chapterTitle: "The Escape Plan",
        chapterDescription: "The outbreak is real. How do you survive?",
        isCompleted: false,
        isActive: false,
        levels: [
          {
            levelId: 1,
            levelTitle: "Survival Mode",
            levelMessage: "No longer a developer, you are now a survivor.",
            scene: [
              {
                sceneId: 1,
                sceneMessage:
                  "You rush to the stairwell, but the door is locked. Zombies block the hall. There’s no turning back.",
                sceneOptions: [
                  {
                    look: "The air reeks of decay, and behind you, the stairwell door rattles. Zombies are closing in.",
                    west: 2,
                    north: 4,
                    attack: [
                      {
                        monsterId: 5,
                        monsterName: "Zombie Accountant",
                        monsterHealth: 100,
                        monsterDamage: 18,
                        attackMessage:
                          "The Zombie Accountant swings a calculator at you like a club.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 2,
                sceneMessage:
                  "You sprint for the fire exit, but it’s blocked. The horde is closing in. There’s no time left.",
                sceneOptions: [
                  {
                    look: "The emergency exit sign glows, but the door is blocked. A fire extinguisher nearby could be useful.",
                    west: 3,
                    east: 1,
                    attack: [
                      {
                        monsterId: 6,
                        monsterName: "Zombie Intern",
                        monsterHealth: 60,
                        monsterDamage: 15,
                        attackMessage:
                          "The Zombie Intern claws at you, blood staining its hands.",
                      },
                    ],
                  },
                ],
              },
              {
                sceneId: 3,
                sceneMessage:
                  "The lobby is filled with zombies. The roof exit is nearby, but desks block the way.",
                sceneOptions: [
                  {
                    look: "Zombies shuffle across the reception area. The roof exit is just a few feet away.",
                    east: 2,
                    west: 4,
                  },
                ],
              },
              {
                sceneId: 4,
                sceneMessage:
                  "You’ve made it to the rooftop. The helicopter is close, but the zombies are nearly upon you.",
                sceneOptions: [
                  {
                    look: "A few zombies shuffle across the rooftop, unaware of your presence. The helicopter is almost here, but you need the key to escape.",
                    attack: [
                      {
                        monsterId: 8,
                        monsterName: "Zombie Pilot",
                        monsterHealth: 250,
                        monsterDamage: 50,
                        attackMessage:
                          "The Zombie Pilot slams a chair at you with terrifying force.",
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
