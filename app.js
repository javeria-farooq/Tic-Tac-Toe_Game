/*3rd thing is apply fnc on HTML pg: */

/*first of all we access our HTML el where we want to apply fnc  */
let boxes = document.querySelectorAll(".box")
let resetBtn = document.querySelector("#resetBtn")
let newGameBtn = document.querySelector("#newGameBtn")
let msgContainer = document.querySelector(".msgContainer")
let msg = document.querySelector("#msg")
let count = 0

// console.log(boxes)

/*ab hmne jn el ko access krlia h ek ek krke unpe fnc apply krnge: t phle boxes wle btn: */
/*ab boxes wle btn m bh hmn phle t ye dkhna h k click evt lgane pe x wle player ki turn h ya o
wle player ki */

let turnO = true /*ab yhn hm ye kaam krwna chah rh hn k agr O player ki turn h yni is variable
ki value true h t O print ho r agr iski value false h t x print h*/

/*ab hm saare winning patterns ko store krwaenge taake hm conditions ko check krwa skn k agr
inmn se koi ek pattern bh complete hrh h t player win krjae */

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

// console.log(winningPattern[0][1])

/*now ab hm all boxes k clicked hne pe phle t evt handle kr lte hn. ab qk boxes jo hn wo ksi
variable m h r us variable m itne saare boxes hn t wo array ki form m hi hte hn hm unko console
pe check bh krwa skte hn. r ksi bh array k hr ek el ko access forEach se krte hn */

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("box was clicked")
        /*box.innerText = "OK" ab hmn yhn OK print nh krwna blke hmn yhn ya t X print krwna h
        ya phr O, ab hmn ye kse pta chlega k kb o print krwaen r kb x print krwaen ab ye hmn
        hmara turnO btaega k jb uski value true hgi O print h r jb uski value false hgi t X
        print h*/
        
        if(turnO === true) {
            box.innerText = "O"
            box.classList.add("font")
            turnO = false
        }

        else{
            box.innerText = "X"
            box.classList.remove("font")
            turnO = true
        }
        box.disabled = true // ab yhn hm apne btn ko click krne k baad disabled krdnge.
        count++ 

        let isWinner = checkWinner()

        if(count === 9 && !isWinner) {
            gameDraw()
        }
    })
})

/*ab hm ye track krnge k kn game jeet rh h t iske lye hmn kia krna prega jse hi koi bh btn click
hrh h oosi time pr hmn check krna prega k kia hmare ps koi winner aarh h t yhn pr hm ek separate
fnc bna skte hn is fnc se kia krnge hm winner k lye check krnge r us fnc ko hm hr br btn k click
krwne pe check krwna h islye hm addEventListenr k undr hi sbse last m is fnc ko cl krwaenge*/

/*first of it we define this fnc: ab hmn ye fnc bnana kse hn r is fnc m kaam ks k upr krwna h
t yhn pe mjhe hr br btn k click hne pe condition check krwni h lkn mre ps hr ek btn nh h mre
ps t ek arr h uske undr 3 arr h r uske undr 3 btns hn ab mjhe hr ek access krna h */

const checkWinner = () => {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText
        let pos2Val = boxes[pattern[1]].innerText
        let pos3Val = boxes[pattern[2]].innerText

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val)
            }

            else if(count === 9 && pos1Val !== pos2Val && pos2Val !== pos3Val){
                msg.innerText = `Oops! Game was draw`
                msgContainer.classList.remove("hide")
                disableBoxes()
            }
        }
        /*console.log(pattern[0], pattern[1], pattern[2])
        console.log(pattern[0], pattern[1], pattern[2])
        console.log(
            boxes[pattern[0]].innerText,
            boxes[pattern[1]].innerText,
            boxes[pattern[2]].innerText
        )*/
    }
}

const showWinner = (winner) => {
   msg.innerText = `Congratulations! winner is ${winner}`
   msgContainer.classList.remove("hide")
   disableBoxes()
}

const disableBoxes = () => {
   for(let box of boxes) {
    box.disabled = true
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false
        box.innerText = ""
    }
}

const resetGame = () => {
    turnO = true
    count = 0
    enableBoxes()
    msgContainer.classList.add("hide")
}


newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)


const gameDraw = () => {
    msg.innerText = `Oops! Game was draw`
    msgContainer.classList.remove("hide")
    disableBoxes()
}