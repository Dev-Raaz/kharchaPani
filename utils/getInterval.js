

//get by quarter
// export const getIntervalYear = (data) => {
    
//     function getQuarter(date = new Date()) {
//         return Math.floor(date.getMonth() / 3 + 1);
//     }

//     //Stores Quarterly Amounts
//     let quarterlyAmounts =[]
//     const curDate = new Date() 
//     let quarters = [
//         {amount: 0},
//         {amount: 0},
//         {amount: 0},
//         {amount: 0} 
//     ]

    
//     data.map(datum=>{
//         if(datum.date.getFullYear() === curDate.getFullYear()){
//             quarters[getQuarter(datum.date)-1].amount = quarters[getQuarter(datum.date)-1].amount + datum.amount 
//         }
//     })

//     //Setting the quarterly amounts
//     quarterlyAmounts = [quarters[0].amount, quarters[1].amount, quarters[2].amount, quarters[3].amount]

//     console.log('Quarterly Amounts')
//     console.log(quarterlyAmounts)
    

//     return quarterlyAmounts
// }



//get by month
export const getIntervalMonth = (data) => {
    const d = new Date();
    const d1 = 24*60*60*1000

    //Stores the displayable data
    const weeklyAmounts = []

    let weeks = [
        {
            amount: 0,
            start: new Date(d - 27*d1),
            end: new Date(d - 21*d1) 
        },
        {
            amount: 0,
            start: new Date(d - 20*d1),
            end: new Date(d - 14*d1)
        },
        {
            amount: 0,
            start: new Date(d - 13*d1),
            end: new Date(d - 7*d1)
        },
        {
            amount: 0,
            start: new Date(d - 6*d1),
            end: new Date(d)
        }
    ]

    weeks.map(week => {
        
        console.log('Comparisions . . .')
        console.log(week.start)

        data.map((datum)=>{

            let DATE = new Date(datum.createdAt)

            const validator1 = DATE.getTime() >=  week.start.getTime()
            
            const validator2 = DATE.getTime() < week.end.getTime()
                                                          
            if(validator1 && validator2){
                week.amount = week.amount + datum.amount
            }
        })

        console.log(week.end)

        //Pushing the weekly updates
        weeklyAmounts.push(week.amount)

    })
    
    console.log('Weekly Amounts')
    console.log(weeklyAmounts)

    return weeklyAmounts

}

//get by month
export const getIntervalWeek = (data) => {
    
    const curDate = new Date()
    const d1 = 24*60*60*1000

    let days = [
        {
            amount:0,
            date: new Date(curDate - d1*6)
        },

        {
            
            amount:0,
            date: new Date(curDate - d1*5)
        },

        {
            
            amount:0,
            date: new Date(curDate - d1*4)
            
        },

        {
            
            amount:0,
            date: new Date(curDate - d1*3)
            
        },

        {
            
            amount:0,
            date: new Date(curDate - d1*2)
            
        },

        {
            
            amount:0,
            date: new Date(curDate - d1*1)
        },

        {
            amount:0,
            date: new Date(curDate)
        }
    ]

    let dailyAmounts = []

    days.map((day)=>{
        
        data.map(datum => {
            
            let DATE = new Date(datum.createdAt)

            const validator = day.date.getFullYear() === DATE.getFullYear()
                              && day.date.getMonth() === DATE.getMonth()
                              && day.date.getDate() === DATE.getDate()


            if(validator){
                day.amount = day.amount + datum.amount
            }
        })

        //Pushing the updated income
        dailyAmounts.push(day.amount)
    })


    return dailyAmounts
}


export const getDiffWeek = (data) => {
    let total = 0
    const lastWeek = new Date().getTime() - 24*60*60*1000*6
    const curWeek = new Date().getTime()
    
    let lastWeekTotal = 0
    data.map(datum => {
        
        let DATE = new Date(datum.createdAt)

        const validator = DATE.getTime() < lastWeek &&
                          DATE.getTime() > lastWeek - 6*24*60*60*1000  

        if(validator){
            lastWeekTotal = lastWeekTotal + datum.amount        
        }
    })

    let curWeekTotal = 0
    data.map(datum=>{
        
        let DATE = new Date(datum.createdAt)
        const validator = DATE.getTime() < curWeek &&
                          DATE.getTime() > curWeek - 6*24*60*60*1000

        if(validator){
            curWeekTotal = curWeekTotal + datum.amount
        }
    })

    return {
        change: curWeekTotal - lastWeekTotal,
        percentage: ((curWeekTotal - lastWeekTotal) / (lastWeekTotal == 0 ? 1 : lastWeekTotal)).toFixed(2)
    }
}

export const getDiffMonth = (data) => {
    let total = 0
    const lastMonth = new Date().getTime() - 24*60*60*1000*28
    const curMonth = new Date().getTime()
    
    let lastMonthTotal = 0
    data.map(datum => {

        let DATE = new Date(datum.createdAt)

        const validator = DATE.getTime() < lastMonth &&
                          DATE.getTime() > lastMonth - 28*24*60*60*1000  

        if(validator){
            lastMonthTotal = lastMonthTotal + datum.amount        
        }
    })

    let curMonthTotal = 0
    data.map(datum=>{
        
        let DATE = new Date(datum.createdAt)

        const validator = DATE.getTime() < curMonth &&
                          DATE.getTime() > curMonth - 27*24*60*60*1000

        if(validator){
            curMonthTotal = curMonthTotal + datum.amount
        }
    })

    return {
        change: curMonthTotal - lastMonthTotal,
        percentage: ((curMonthTotal - lastMonthTotal) / (lastMonthTotal == 0 ? 1 : lastMonthTotal)).toFixed(2)
    }
}

export const getTopPieWeek = (data, cats, c1, c2, c3) => {

    console.log(`Recieved Categories ✌️`)
    console.log(cats)

    //Start end date
    const lastWeek = new Date().getTime() - 24*60*60*1000*6
    const curWeek = new Date().getTime()
    
    
    //Getting the last week data
    const lastWeekData = data.filter(datum=>{
        
        let DATE = new Date(datum.createdAt)

        if(DATE.getTime() > lastWeek && DATE.getTime() <= curWeek ){
            return datum
        }
    })

    let categories = []

    //Getting the categories of last week
    lastWeekData.map(datum => {
        if(!categories.includes(datum.category)){
            categories.push(datum.category)
        }
    })


    //Get categories sum
    let catSum = []
    categories.map(
        cat => {
            let sum = 0
            lastWeekData.map(datum=>{
                if(datum.category == cat){
                    sum = sum + datum.amount
                }
            })

            //Creating a new category
            let item = {
                name: cat,
                sum: sum
            }

            //Pushing the sum and cat id
            catSum.push(item)
        }
    )

    //-------------------------------------------
    //Sorting the catSum array
    //Our Compare Function
    function compare(a,b){
        if(a.sum > b.sum){
            return -1
        }else{
            return 1
        }

        return 0
    }

    //Sorting the items
    catSum = catSum.sort(compare)

    //Selecting top 3
    let top3 = [
        {name: 'None', sum: 0, color: c1},
        {name: 'None', sum: 0, color: c2},
        {name: 'None', sum: 0, color: c3}
    ]

    for(let i = 0; i<catSum.length; i++){
        if(i<3){
            top3[i] = {...catSum[i], color: (top3[i].color)}
        }else{
            break
        }
    }

    console.log(`Top 3`)
    console.log(top3)

    //Getting categories names
    top3.map(top => {
        cats.map(cat=>{
            if(cat._id == top.name){
                top.name = cat.name
            }
        })
    })
    

    return top3

}

export const getTopPieMonth = (data, cats, c1, c2, c3) => {

    console.log(`Recieved Categories ✌️`)
    console.log(cats)

    //Start end date
    const lastMonth = new Date().getTime() - 24*60*60*1000*27
    const curMonth = new Date().getTime()
    
    
    //Getting the last week data
    const lastMonthData = data.filter(datum=>{
        
        let DATE = new Date(datum.createdAt)

        if(DATE.getTime() > lastMonth && DATE.getTime() <= curMonth ){
            return datum
        }
    })

    let categories = []

    //Test 1
    console.log('Last Month Categories')
    console.log(lastMonthData)

    //Getting the categories of last week
    lastMonthData.map(datum => {
        if(!categories.includes(datum.category)){
            categories.push(datum.category)
        }
    })


    //Get categories sum
    let catSum = []
    categories.map(
        cat => {
            let sum = 0
            lastMonthData.map(datum=>{
                if(datum.category == cat){
                    sum = sum + datum.amount
                }
            })

            //Creating a new category
            let item = {
                name: cat,
                sum: sum
            }

            //Pushing the sum and cat id
            catSum.push(item)
        }
    )

    //-------------------------------------------
    //Sorting the catSum array
    //Our Compare Function
    function compare(a,b){
        if(a.sum > b.sum){
            return -1
        }else{
            return 1
        }

        return 0
    }

    //Sorting the items

    catSum = catSum.sort(compare)
    
    //Test 2
    console.log('Sorted catsum ⭐')
    console.log(catSum)

    //Selecting top 3
    let top3 = [
        {name: 'None', sum: 0, color: c1},
        {name: 'None', sum: 0, color: c2},
        {name: 'None', sum: 0, color: c3}
    ]

    for(let i = 0; i<catSum.length; i++){
        if(i<3){
            top3[i] = {...catSum[i], color: (top3[i].color)}
        }else{
            break
        }
    }

    console.log(`Top 3`)
    console.log(top3)

    //Getting categories names
    top3.map(top => {
        cats.map(cat=>{
            if(cat._id == top.name){
                top.name = cat.name
            }
        })
    })
    
    console.log(`Top3`)
    console.log(top3)

    return top3

}

export const getTopPieWeekExp = (data, cats, c1, c2, c3) => {

    console.log(`Recieved Categories ✌️`)
    console.log(cats)

    //Start end date
    const lastWeek = new Date().getTime() - 24*60*60*1000*6
    const curWeek = new Date().getTime()
    
    
    //Getting the last week data
    const lastWeekData = data.filter(datum=>{
        
        let DATE = new Date(datum.createdAt)

        if(DATE.getTime() > lastWeek && DATE.getTime() <= curWeek ){
            return datum
        }
    })

    let categories = []

    //Getting the categories of last week
    lastWeekData.map(datum => {
        if(!categories.includes(datum.category)){
            categories.push(datum.category)
        }
    })


    //Get categories sum
    let catSum = []
    categories.map(
        cat => {
            let sum = 0
            lastWeekData.map(datum=>{
                if(datum.category == cat){
                    sum = sum + datum.amount
                }
            })

            //Creating a new category
            let item = {
                name: cat,
                sum: sum
            }

            //Pushing the sum and cat id
            catSum.push(item)
        }
    )

    //-------------------------------------------
    //Sorting the catSum array
    //Our Compare Function
    function compare(a,b){
        if(a.sum > b.sum){
            return -1
        }else{
            return 1
        }

        return 0
    }

    //Sorting the items
    catSum = catSum.sort(compare)

    //Selecting top 3
    let top3 = [
        {name: 'None', sum: 0, color: c1},
        {name: 'None', sum: 0, color: c2},
        {name: 'None', sum: 0, color: c3}
    ]

    for(let i = 0; i<catSum.length; i++){
        if(i<3){
            top3[i] = {...catSum[i], color: (top3[i].color)}
        }else{
            break
        }
    }

    console.log(`Top 3`)
    console.log(top3)

    //Getting categories names
    top3.map(top => {
        cats.map(cat=>{
            if(cat._id == top.name){
                top.name = cat.name
            }
        })
    })
    

    return top3

}

export const getTopPieMonthExp = (data, cats, c1, c2, c3) => {

    console.log(`Recieved Categories ✌️`)
    console.log(cats)

    //Start end date
    const lastWeek = new Date().getTime() - 24*60*60*1000*27
    const curWeek = new Date().getTime()
    
    
    //Getting the last week data
    const lastWeekData = data.filter(datum=>{
        
        let DATE = new Date(datum.createdAt)

        if(DATE.getTime() > lastWeek && DATE.getTime() <= curWeek ){
            return datum
        }
    })

    let categories = []

    //Getting the categories of last week
    lastWeekData.map(datum => {
        if(!categories.includes(datum.category)){
            categories.push(datum.category)
        }
    })


    //Get categories sum
    let catSum = []
    categories.map(
        cat => {
            let sum = 0
            lastWeekData.map(datum=>{
                if(datum.category == cat){
                    sum = sum + datum.amount
                }
            })

            //Creating a new category
            let item = {
                name: cat,
                sum: sum
            }

            //Pushing the sum and cat id
            catSum.push(item)
        }
    )

    //-------------------------------------------
    //Sorting the catSum array
    //Our Compare Function
    function compare(a,b){
        if(a.sum > b.sum){
            return -1
        }else{
            return 1
        }

        return 0
    }

    //Sorting the items
    console.log('Sorted . . .')
    catSum = catSum.sort(compare)

    //Selecting top 3
    let top3 = [
        {name: 'None', sum: 0, color: c1},
        {name: 'None', sum: 0, color: c2},
        {name: 'None', sum: 0, color: c3}
    ]

    for(let i = 0; i<catSum.length; i++){
        if(i<3){
            top3[i] = {...catSum[i], color: (top3[i].color)}
        }else{
            break
        }
    }

    console.log(`Top 3`)
    console.log(top3)

    //Getting categories names
    top3.map(top => {
        cats.map(cat=>{
            if(cat._id == top.name){
                top.name = cat.name
            }
        })
    })
    
    console.log(`Top3`)
    console.log(top3)

    return top3

}

export default getIntervalWeek