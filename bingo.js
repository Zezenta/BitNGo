var number_of_boards;
var boards = [];

function create_boards()
{
    for(i = 0; i<number_of_boards; i++)
    {
        var used_numbers = [];
        var id = i.toString();
        var board = [];
        for(l = 1; l<6; l++)
        {
            for(n = ((15*l - 15) + 1); n<((15*l) + 1); n++)
            {
                var newnum = random((15*l - 15), ((15*l) + 1));
            }
        }
    }
}

function random(min, max) //funcion de aleatoriedad
{
	var number = Math.floor( Math.random() * (max - min + 1) + min)
	return number;
}