const cards = JSON.parse(`
  {
    "caracteristics": {
      "gender": ["Male", "Female"],
      "hair color": ["White", "Blonde", "Black", "Brown", "Red"],
      "eyes color": ["Brown", "Blue"],
      "moustache": [false, true],
      "hat": [false, true],
      "glasses": [false, true],
      "hair length": ["Bold", "Short", "Mid-long", "Long"],
      "beard": [false, true]
    },

    "characters": {
      "samuel": {
        "spriteCoordinates": [0, 0],
        "caracteristics": {
          "gender": 0,
          "hair color": 0,
          "eyes color": 0,
          "moustache": 0,
          "hat": 0,
          "glasses": 1,
          "hair length": 0,
          "beard": 0
        }
      },
      "léon": {
        "spriteCoordinates": [1, 0],
        "caracteristics": {
          "gender": 0,
          "hair color": 1,
          "eyes color": 0,
          "moustache": 0,
          "hat": 0,
          "glasses": 1,
          "hair length": 1,
          "beard": 0
        }
      },
      "simon": {
        "spriteCoordinates": [2, 0],
        "caracteristics": {
          "gender": 0,
          "hair color": 0,
          "eyes color": 0,
          "moustache": 0,
          "hat": 0,
          "glasses": 1,
          "hair length": 1,
          "beard": 0
        }
      },
      "martin": {
        "spriteCoordinates": [3, 0],
        "caracteristics": {
          "gender": 0,
          "hair color": 0,
          "eyes color": 0,
          "moustache": 0,
          "hat": 1,
          "glasses": 0,
          "hair length": 1,
          "beard": 0
        }
      }
    }
  }
`);
