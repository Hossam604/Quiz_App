let btns=$("button")

//let category=document.getElementById('category').value

//console.log(category);

let quiz;


async function startQuiz(){

let category=$("#category").val()
let difficulty=Array.from(document.getElementsByName('difficulty')).find((e)=>e.checked).value
let numOfQuet=$("#numOfQuet").val()
let api=`https://opentdb.com/api.php?amount=${numOfQuet}&category=${category}&difficulty=${difficulty}`
//console.log(api);
//console.log(category, difficulty,numOfQuet);
let questions= await getApi(api)
quiz=questions

//console.log(questions);

if(questions.length>0){
    $("#alert").addClass('d-none')
      $("#setting").hide(0)
    $("#quiz").show(0)
showQuet()


}
else{
$("#alert").removeClass('d-none')
}


}


async function getApi(url){
    let response= await fetch(url)
    let data = await response.json()
 //   console.log(data.results);
    return data.results
  
  }

//getApi()
let current1=0
let correct1=0
let ans=[]
let index
function showQuet(){
    
    //let current=0
    let current=current1
    let Answers=[...quiz[current].incorrect_answers]
    let correct=quiz[current].correct_answer
    const random=Math.ceil(Math.random()*Answers.length)
    Answers.splice(random,0,correct)
   // console.log(correct,Answers);
correct1=correct
ans=Answers

    //console.log(incorrectAnswers);
//console.log(quiz[0].question);
$("#current").html(`${current+1}`)
$("#all").html(`${quiz.length}`)
$("#q").html(`${quiz[current].question}`)
let cartona=``
for(let i=0;i<Answers.length;i++){
index=i

cartona+=`
 <div class="h2">
  <input name="answers" value="${Answers[i]}" type="radio" class=""> ${Answers[i]} 

 </div>


`
}

document.getElementById('answers').innerHTML=cartona



}

function nextQuet(){
    let userAnswer=Array.from(document.getElementsByName('answers')).find((e)=>e.checked)?.value
   console.log(userAnswer);
   console.log(correct1);
    if(userAnswer !=undefined){
        $("#choose").hide(500)
        current1++
        chckans(userAnswer,correct1)
    }
    
    else if(userAnswer== undefined){
        console.log(userAnswer);
        
        $("#choose").show(500)
                
            }
        if(current1<quiz.length){
            console.log(true);
            showQuet()
        }
           else{
            console.log(false);
            $("#quiz").hide(1000)
            $("#score").show(1000)
            
        }
            
        }
        
   
        
    

        let score=0

        function chckans(userAnswer,correct){
            if(userAnswer==correct){
            $("#correct").show(500).hide(1000)
            $("#score1").html(`${++score}`)

            }
            else{
                $("#incorrect").show(500).hide(1000)

            }
        }





btns.eq(0).click(function(){
  startQuiz()

  
   // console.log("hos");
   

})




btns.eq(1).click(function(){
 
    nextQuet()

})

btns.eq(2).click(function(){
    $("#score").hide(1000)
   // $("#setting").show(1000)
   location.reload()

})