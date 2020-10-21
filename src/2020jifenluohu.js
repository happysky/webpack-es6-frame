import axios from 'axios'
import qs from 'querystring'

const allResult = [];
let id = 1;

window.allResult = allResult;


function getData(){
    id++
    if(id > 6033){
        return false;
    }
    axios.post('/nwesqintegralpublic/settlePerson/settlePersonDetails', qs.stringify({id}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
      })
      .then(function ({ data: html }) {
        const nameAndCompanyReg = /<p\s+style="font-size:\s+15px;color:\s+black;margin-left:\s+20px;">单位名称：([^&]+) &nbsp;&nbsp;&nbsp;<br\/>姓名：([^<]+)<\/p>/;
        const nameAndCompanyRegInfo = nameAndCompanyReg.exec(html)
        const name = nameAndCompanyRegInfo[2]
        const company = nameAndCompanyRegInfo[1]
    
        const titleReg = /<td\s+height="35"\s+align="left"\s+style="border-right: 0px;border-left: 0px">([^<]+)<\/td>/ig
        const titleHtmls = html.match(titleReg)
        const titles = titleHtmls.map((html)=>{
            titleReg.lastIndex = 0;
            const tmp = titleReg.exec(html) || []
            return tmp[1]
        })
    
        const scoreReg = /<td\s+height="35"\s+align="center"\s+style="border-left:\s+0px">([\d\.-]+)\s?<\/td>/ig
        const scoreHtmls = html.match(scoreReg)
        const scores = scoreHtmls.map((html)=>{
            scoreReg.lastIndex = 0;
            const tmp = scoreReg.exec(html) || []
            return tmp[1]
        })
    
        const userInfo = {
            id,
            name,
            company,
            score: {},
            scores
        }
        titles.forEach((title, index)=>{
            userInfo.score[title] = scores[index]
        })
    
        console.log(userInfo)
        insertHtml(userInfo)
        allResult.push(userInfo)

        // setTimeout(()=>{
            getData();
        // },1000)
        
      })
}

function insertHtml(userInfo){
    const html = `<li>
        ${userInfo.id}  ${userInfo.name}  ${userInfo.company}  ${userInfo.scores.join(' ')}
    </li>`

    document.querySelector('#test ul').innerHTML += html
}

getData();
