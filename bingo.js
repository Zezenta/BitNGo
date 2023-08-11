var number_of_boards; //needs to be at least one
var boards = []; //contains all the current boards
var played_nums = []; //contains all the already played numbers
var bingo_letters = ["B", "I", "N", "G", "O"]; //this is useful to log things on the console
var win_conditions = [wc_bingo, wc_full_table, wc_four_corners, wc_linked_four_corners]; //contains the functions of all win conditions
var curr_wc = 0; //current win condition is normal bingo

var center_numbers = []; //array that contains what used to be the center numbers of each board. DEVELOPER USE ONLY

var num_of_empty_arrays = 76;
var boards_index = Array.from({ length: num_of_empty_arrays }, () => []);

console.log("Current win condition is " + win_conditions[curr_wc].name);

function create_boards() //creates a number of boards depending on number_of_boards
{
    for(i = 0; i<number_of_boards; i++)
    {
        var used_numbers = []; //contains all the already used numbers in the board
        var id = i; //assigns an id to each board, starting from 0
        var board = [[],[],[],[],[]]; //a subarray for each bingo letter
        board.unshift(id); //puts the id before the letters on the board
        for(l = 1; l<6; l++)
        {
            for(n = 0; n<5; n++)
            {
                var newnum = random(((15 * l - 15) + 1), (15 * l)); //creates a new number based on the letter
                while(used_numbers.includes(newnum))
                {
                    newnum = random(((15 * l - 15) + 1), (15 * l)); //if the  number already exists in the table, another one is created
                }
                used_numbers.push(newnum); //pushes the new number inside the used_numbers array
                board[l].push(newnum); //pushes the new number inside its letter array
                boards_index[newnum].push(id); //pushes the board id into the boards index. its type is a number
            }
        }
        boards.push(board); //pushes the new board inside the boards array
    }
    for(i=0; i<boards.length; i++) //function that already puts a chip in the center of the board
    {
        center_numbers.push(boards[i][3][2]);
        boards_index[boards[i][3][2]].splice(boards_index[boards[i][3][2]].indexOf(i), 1);
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
    for(i=0; i<boards_index[nm].length; i++) //for every board id inside the played number array...
    {
        boards[boards_index[nm][i]][ltr][boards[boards_index[nm][i]][ltr].indexOf(nm)] = "X"; //look at said number inside the board that we are currently searching
    }
    boards.forEach(element => {
        console.table(element);
    })
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
                    console.log("%c Bingo on board " + i, "color:green");
                }
                if(boards[i][1][l] === "X" && boards[i][2][l] === "X" && boards[i][3][l] === "X" && boards[i][4][l] === "X" && boards[i][5][l] === "X") //sideways bingo
                {
                    console.log("%c Sideways bingo on board " + i, "color:green");
                }
            }
            //diagonal bingo. We don't check boards[i][3][2] because it is the center and already has an "X"
            if(boards[i][1][0] === "X" && boards[i][2][1] === "X" && boards[i][4][3] === "X" && boards[i][5][4] === "X")
            {
                console.log("%c Diagonal bingo on board " + i, "color:green");
            }
            if(boards[i][5][4] === "X" && boards[i][4][3] === "X" && boards[i][2][1] === "X" && boards[i][1][0] === "X")
            {
                console.log("%c Diagonal bingo on board " + i, "color:green");
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
                console.log("%c Full table on board " + i, "color:green");
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
                console.log("%c Four corners on board " + i, "color:green");
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
                console.log("%c Linked four corners on board " + i, "color:green");
            }
        }
    }
}


//TEST FUNCTIONS
function test_index()
{
    console.log("The center numbers used to be " + center_numbers);
    boards.forEach(element =>{
        console.log("The numbers for the letter N in " + element[0] + " are");
        for(i=0; i<5; i++)
        {   
            if(typeof(element[3][i]) == "number")
            {
                //check if the numbers are in the index (good)
                console.log(element[3][i])
                if(boards_index[element[3][i]].includes(element[0]))
                {
                    console.log("%c Said number is in the index", "color:green");
                }
                else
                {
                    console.log("%c Said number is NOT in the index", "color:red");
                }
            }
        }
        //check if the center numbers are in the index (bad)
        if(boards_index[center_numbers[element[0]]].includes(element[0]))
        {
            console.log("%c The middle number " + center_numbers[element[0]] + " IS in the index", "color:red");
        }
        else if(!boards_index[center_numbers[element[0]]].includes(element[0])){
            console.log("%c The middle number " + center_numbers[element[0]] + " is NOT in the index", "color:green");
        }
    })

    var sum = 0;
    for(i=0; i<boards_index.length; i++)
    {
        sum += boards_index[i].length;
    }
    console.log("There is a total of " + sum + " elements in the index")
}