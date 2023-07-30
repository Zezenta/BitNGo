var number_of_boards;
var boards = [];

function create_boards()
{
    for(i = 0; i<number_of_boards; i++)
    {
        var used_numbers = [];
        var id = i.toString();
        var board = [[],[],[],[],[]];
        board.unshift(id);
        console.log(board);
        for(l = 1; l<6; l++)
        {
            for(n = 0; n<5; n++)
            {
                var newnum = random(((15*l - 15) + 1), ((15*l) + 1));
                while(used_numbers.includes(newnum))
                {
                    newnum = random(((15*l - 15) + 1), ((15*l) + 1));
                }
                used_numbers.push(newnum);
                board[l].push(newnum);
            }
        }
        boards.push(board);
    }
}

function random(min, max) //funcion de aleatoriedad
{
	var number = Math.floor( Math.random() * (max - min + 1) + min)
	return number;
}