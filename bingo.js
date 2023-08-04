var number_of_boards; //needs to be at least one
var boards = []; //contains all the current boards
var played_nums = []; //contains all the already played numbers
var bingo_letters = ["B", "I", "N", "G", "O"]; //this is useful to log things on the console
var win_conditions = [wc_bingo, wc_full_table, wc_four_corners, wc_linked_four_corners]; //contains the functions of all win conditions
var curr_wc = 0; //current win condition is normal bingo

console.log("Current win condition is " + win_conditions[curr_wc].name);

function create_boards() //creates a number of boards depending on number_of_boards
{
    for(i = 0; i<number_of_boards; i++)
    {
        var used_numbers = []; //contains all the already used numbers in the board
        var id = i.toString(); //assigns an id to each board, starting from 0
        var board = [[],[],[],[],[]]; //a subarray for each bingo letter
        board.unshift(id); //puts the id before the letters on the board
        console.table(board);
        for(l = 1; l<6; l++)
        {
            for(n = 0; n<5; n++)
            {
                var newnum = random(((15 * l - 15) + 1), ((15 * l) + 1)); //creates a new number based on the letter
                while(used_numbers.includes(newnum))
                {
                    newnum = random(((15 * l - 15) + 1), (15 * l)); //if the  number already exists in the table, another one is created
                }
                used_numbers.push(newnum); //pushes the new number inside the used_numbers array
                board[l].push(newnum); //pushes the new number inside its letter array
            }
        }
        boards.push(board); //pushes the new board inside the boards array
    }
    for(i=0; i<boards.length; i++) //function that already puts a chip in the center of the board
    {
        boards[i][3][2] = "X";
    }
}

function hack_chip(hackl, hackn) //get whatever chip i want, like hacking. It's just a devtool to test things out. haclk is for intended letter, hackn is for intended number
{
    played_nums.push(hackl);
    console.log(bingo_letters[hackl-1] + hackn);
    check_boards(hackl, hackn);
    win_conditions[curr_wc]();
}

function play_chip() //normal function to pick a chip randomly
{
    var letter = random(1, 5); //gets the letter between BINGO
    var num = random((15 * letter - 15) + 1, 15 * letter); //gets a number from that letter range
    while(played_nums.includes(num))
    {
        num = random((15 * letter - 15) + 1, 15 * letter); //if the number already exists, picks another one. HERE THERE WILL BE A BUG
    }
    played_nums.push(num); //puts the new number in the played numbers array
    console.log(bingo_letters[letter-1] + num); 
    check_boards(letter, num); //marks "X" through the boards globally
    win_conditions[curr_wc](); //looks for bingos depending on the current win condition
}

function check_boards(ltr, nm) //puts chips in played numbers
{
    for(i=0; i<boards.length; i++) //checks each board
    {
        if(boards[i][ltr].includes(nm)) //if it includes the number...
        {
            boards[i][ltr][boards[i][ltr].indexOf(nm)] = "X"; //it marks it as "X"
        }
    }
    console.table(boards[0]);
}

function random(min, max) //randomize function
{
	var number = Math.floor( Math.random() * (max - min + 1) + min)
	return number;
}

//WIN CONDITIONS
function wc_bingo() //normal bingo win condition
{
    if(played_nums.length >= 5)
    {
        for(i=0; i<boards.length; i++)
        {
            for(l=1; l<=5; l++)
            {
                if(boards[i][l].every(element => element === "X")) //bingo on one letter
                {
                    console.log("Bingo on board " + i);
                }
                if(boards[i][1][l] === "X" && boards[i][2][l] === "X" && boards[i][3][l] === "X" && boards[i][4][l] === "X" && boards[i][5][l] === "X") //sideways bingo
                {
                    console.log("sideways bingo on board " + i);
                }
            }
            //diagonal bingo. We don't check boards[i][3][2] because it is the center and already has an "X"
            if(boards[i][1][0] === "X" && boards[i][2][1] === "X" && boards[i][4][3] === "X" && boards[i][5][4] === "X")
            {
                console.log("Diagonal bingo on board " + i);
            }
            if(boards[i][5][4] === "X" && boards[i][4][3] === "X" && boards[i][2][1] === "X" && boards[i][1][0] === "X")
            {
                console.log("Diagonal bingo on board " + i);
            }
        }
    }
}

function wc_full_table()
{
    if(played_nums.length >= 24)
    {
        for(i=0; i<boards.length; i++)
        {
            if(boards[i][1].every(element => element === "X") && boards[i][2].every(element => element === "X") && boards[i][3].every(element => element === "X") && boards[i][4].every(element => element === "X") && boards[i][5].every(element => element === "X"))
            {
                console.log("Full table on board " + i);
            }
        }
    }
}

function wc_four_corners()
{
    if(played_nums.length >= 4)
    {
        for(i=0; i<boards.length; i++)
        {
            if(boards[i][1][0] === "X" && boards[i][1][4] === "X" && boards[i][5][0] === "X" && boards[i][5][4] === "X")
            {
                console.log("Four corners on board " + i);
            }
        }
    }
}

function wc_linked_four_corners()
{
    if(played_nums.length >= 16)
    {
        for(i=0; i<boards.length; i++)
        {
            if(boards[i][1].every(element => element === "X") && boards[i][5].every(element => element === "X") && boards[i][2][0] === "X" && boards[i][2][4] === "X" && boards[i][3][0] === "X" && boards[i][3][4] === "X" && boards[i][4][0] === "X" && boards[i][4][4] === "X")
            {
                console.log("Linked four corners on board " + i);
            }
        }
    }
}