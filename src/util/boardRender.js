


function renderBoard(fenArray) {
    console.log("in function is promise.");
    console.log(fenArray);
    fenArray.then(res => {
        console.log(".then it ?");
        console.log(res);
    })
}