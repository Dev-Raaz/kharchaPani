import transactions from '../assets/data'


//get by quarter
export const getIntervalYear = (data) => {
    
    function getQuarter(date = new Date()) {
        return Math.floor(date.getMonth() / 3 + 1);
    }

    //Stores Quarterly Amounts
    let quarterlyAmounts =[]
    const curDate = new Date() 
    let quarters = [
        {amount: 0},
        {amount: 0},
        {amount: 0},
        {amount: 0} 
    ]

    
    data.map(datum=>{
        if(datum.date.getFullYear() === curDate.getFullYear()){
            quarters[getQuarter(datum.date)-1].amount = quarters[getQuarter(datum.date)-1].amount + datum.amount 
        }
    })

    //Setting the quarterly amounts
    quarterlyAmounts = [quarters[0].amount, quarters[1].amount, quarters[2].amount, quarters[3].amount]

    console.log('Quarterly Amounts')
    console.log(quarterlyAmounts)
    

    return quarterlyAmounts
}

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

            console.log(datum.date)

            const validator1 = datum.date.getTime() >=  week.start.getTime()
            
            const validator2 = datum.date.getTime() < week.end.getTime()
                                                          
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
            
            const validator = day.date.getFullYear() === datum.date.getFullYear()
                              && day.date.getMonth() === datum.date.getMonth()
                              && day.date.getDate() === datum.date.getDate()


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
        
        const validator = datum.date.getTime() < lastWeek &&
                          datum.date.getTime() > lastWeek - 6*24*60*60*1000  

        if(validator){
            lastWeekTotal = lastWeekTotal + datum.amount        
        }
    })

    let curWeekTotal = 0
    data.map(datum=>{
        const validator = datum.date.getTime() < curWeek &&
                          datum.date.getTime() > curWeek - 6*24*60*60*1000

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
        
        const validator = datum.date.getTime() < lastMonth &&
                          datum.date.getTime() > lastMonth - 28*24*60*60*1000  

        if(validator){
            lastMonthTotal = lastMonthTotal + datum.amount        
        }
    })

    let curMonthTotal = 0
    data.map(datum=>{
        const validator = datum.date.getTime() < curMonth &&
                          datum.date.getTime() > curMonth - 27*24*60*60*1000

        if(validator){
            curMonthTotal = curMonthTotal + datum.amount
        }
    })

    return {
        change: curMonthTotal - lastMonthTotal,
        percentage: ((curMonthTotal - lastMonthTotal) / (lastMonthTotal == 0 ? 1 : lastMonthTotal)).toFixed(2)
    }
}


export default getIntervalWeek