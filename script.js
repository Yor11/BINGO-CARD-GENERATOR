// BingoCard class represents a bingo card with 5 rows and 5 columns
class BingoCard {
  // Initializes an empty matrix and an array of column objects with letter, min, and max properties.
  constructor() {
    this.matrix = [];
  }

  // Fills the matrix with randomly generated values.
  generateMatrix() {
    let isNumberExist = {};

    for (let row = 0; row < 5; row++) {
      let [min, max] = [1, 15];
      let rowValues = [];
      let currentCol = 0;

      do {
        const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

        if (isNumberExist[randomNumber] !== true) {
          rowValues.push(randomNumber);
          currentCol += 1;
          (min += 15), (max += 15);
        }

        isNumberExist[randomNumber] = true;
      } while (currentCol < 5);

      this.matrix.push(rowValues);
    }

    this.matrix[2][2] = "FREE";
  }

  // Returns an HTML table representing the bingo card.
  drawCard() {
    let table = "<table>";
    let tableHeader = "";
    let bingoChar = ["B", "I", "N", "G", "O"];

    bingoChar.forEach((char) => (tableHeader += `<th>${char}</th>`));
    table += tableHeader;

    this.matrix.forEach((row) => {
      table += "<tr>";
      row.forEach((val) => {
        if (val === "FREE") {
          table += '<td class="free-cell highlight">FREE</td>';
        } else {
          table += `<td>${val}</td>`;
        }
      });
      table += "</tr>";
    });

    table += "</table>";
    return table;
  }
}

class BallDraw {
  constructor() {
    // Initialize an empty array to keep track of drawn balls
    this.ballDrawns = [];
  }

  drawBall() {
    // Check if all balls have been drawn
    if (this.ballDrawns.length === 75) {
      alert("All balls have been drawn.");
      return;
    }
    // Generate a unique ball
    let ball;
    do {
      // Define the letters and randomly select one
      let letters = ["B", "I", "N", "G", "O"];
      let letter = letters[Math.floor(Math.random() * letters.length)];

      // Generate a random number in the correct range for the selected letter
      let number =
        Math.floor(Math.random() * 15) + 1 + 15 * letters.indexOf(letter);

      // Combine the letter and number to create the ball string
      ball = letter + number;
    } while (this.ballDrawns.includes(ball));

    // Add the ball to the list of drawn balls
    this.ballDrawns.push(ball);

    // Mark the card with the drawn ball
    this.markCard(ball);
  }

  markCard(ball) {
    // Get all of the table cells
    let cells = document.querySelectorAll("td");

    // Loop through the cells and check if the ball matches the cell value
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].textContent == ball.substring(1)) {
        // Add the highlight class to the cell if the ball matches
        cells[i].classList.add("highlight");
      }
    }
  }
}
