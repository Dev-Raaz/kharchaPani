import {View, Text, Image, Dimensions} from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit"


//styles
import Containers from '../../styles/containers'
import Typography from '../../styles/typography'
import Buttons from '../../styles/buttons'
import Images from '../../styles/images'
import Cards from '../../styles/cards'
import Variables from '../../styles/variables'

import { Line } from 'react-native-svg'
import { useEffect, useState } from 'react'

import 
{
    getIntervalMonth, 
    getIntervalWeek, 
    getIntervalYear, 
    getDiffWeek
} from '../../utils/getInterval'


//-----------------------------------------------------
//Available Balance
export const AvailBalance = ({balance, prevBalance, interval}) => {

    return (
        <View style={Cards.horCard}>
            <View>
                <Text style={Typography.pBold}>Available Balance</Text>
                <View style={Containers.topS}>
                    <Text style={Typography.h2Prm}>{`₹ ${balance !== '' ? balance : 0}`}</Text>
                </View>
                
                <View style={Containers.topS}>
                    <View style={Containers.flexHor}>
                        <Text style={balance > prevBalance ? Typography.greenP : Typography.redP}>
                            {
                                balance > prevBalance
                                ? `+₹${balance-prevBalance}`
                                : `-₹${prevBalance-balance}`
                            }
                        </Text>
                        <Text> than last {interval || 'time'}</Text>
                    </View>
                </View>

            </View>

            <Image
                style={Images.cardHeroImg}
                source={require('../../assets/images/heroImg.png')}
            />
        </View>
    )
}


///---------------------------------------------------------------------
//INCOME CHARTS
//----------------------------------------------------------------------

export const IncomeChart = ({incomes}) => {

    const [interval, setInterval] = useState('week')
    const [pointsData, setPointsData] = useState([0,1,2,3,4])
    const [change, setChange] = useState(0)
    const [rate, setRate] = useState(0)


    useEffect(()=>{
        if(incomes !== null){
            if(interval === 'week'){
                const temp = getIntervalWeek(incomes)
                const changes = getDiffWeek(incomes)
                setPointsData(temp)
                setChange(changes.change)
                setRate(changes.percentage)
            }
            else if(interval === 'month'){
                const temp = getIntervalMonth(incomes)
                setPointsData(temp)
            }else if(interval === 'year'){
                const temp = getIntervalYear(incomes)
                setPointsData(temp)
            }
        }
        
    },[incomes])

    //---------------------------------------------------------
    //Chart Section
    const widthChart = Dimensions.get('window').width - 4*Variables.sizes.szM
    //Chart Data
    const data = {
        labels: interval == 'month' ? ['week1', 'week2', 'week3', 'week4'] 
        : interval == 'year' ? ['quarter1', 'quarter2', 'quarter3', 'quarter4']
        : ['S','M','T','W','T','F','S'], 
        datasets: [
          {
            data: pointsData,
            color: ()=>Variables.color.success, // optional
            strokeWidth: 2 // optional
          }
        ]// optional
      };

      const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 1,
        color: () => Variables.color.prmTxtColor,
        strokeWidth: 2,
        propsForBackgroundLines: {
            stroke: 'rgba(112,112,112,0.15)'
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            fill: Variables.color.success
        },
        useShadowColorFromDataset: false,
        labelColor: (opacity = 1) => Variables.color.prmTxtColor,
      };

    return (
        <View>
            <View style={Containers.bottomM}>
                <View style={Containers.topL}>
                    <View style={Containers.flexHor}>
                        <Text style={Typography.h3}>Income Chart</Text>
                        <Text>Monthly</Text>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCard}> 
                <View style={Containers.flexHorNorm}>
                    <Text style={Cards.incomeCardTxtBold}>{change < 0 ? `${change}` : `+${change}` }</Text>
                    <Text style={Cards.incomeCardTxt}>  {change < 0 ? `(${rate}%)` : `(+${rate}%)`}</Text> 
                    <Text> from last {interval}</Text> 
                </View>

                <View style={
                    {
                        marginTop: Variables.sizes.szL,
                        alignItems: 'flex-start'
                    }
                    }>
                <LineChart
                    data={data}
                    width={widthChart}
                    height={180}
                    chartConfig={chartConfig}
                    yAxisLabel={'₹'}
                    yAxisInterval={1}
                    withShadow={false}
                    withVerticalLines={false}
                    bezier
                />
                </View>
            </View>

        </View>
    )
}


//------------------------------------------------
//Expenese Chart
//------------------------------------------------
export const ExpenseChart = ({expenses}) => {

    const [interval, setInterval] = useState('week')
    const [pointsData, setPointsData] = useState([0,1,2,3,4])
    const [change, setChange] = useState(0)
    const [rate, setRate] = useState(0)


    useEffect(()=>{
        if(expenses !== null){
            if(interval === 'week'){
                const temp = getIntervalWeek(expenses)
                const changes = getDiffWeek(expenses)
                setPointsData(temp)
                setChange(changes.change)
                setRate(changes.percentage)
            }
            else if(interval === 'month'){
                const temp = getIntervalMonth(expenses)
                setPointsData(temp)
            }else if(interval === 'year'){
                const temp = getIntervalYear(expenses)
                setPointsData(temp)
            }
        }
        
    },[expenses])

    //---------------------------------------------------------
    //Chart Section
    const widthChart = Dimensions.get('window').width - 4*Variables.sizes.szM
    //Chart Data
    const data = {
        labels: interval == 'month' ? ['week1', 'week2', 'week3', 'week4'] 
        : interval == 'year' ? ['quarter1', 'quarter2', 'quarter3', 'quarter4']
        : ['D1','D2','D3','D4','D5','D6','D7'], 
        datasets: [
          {
            data: pointsData,
            color: ()=>Variables.color.error, // optional
            strokeWidth: 2 // optional
          }
        ]// optional
      };

      const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        decimalPlaces: 1,
        color: () => Variables.color.prmTxtColor,
        strokeWidth: 2,
        propsForBackgroundLines: {
            stroke: 'rgba(112,112,112,0.15)'
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            fill: Variables.color.error
        },
        useShadowColorFromDataset: false,
        labelColor: () => Variables.color.prmTxtColor,
      };

    return (
        <View>
            <View style={Containers.bottomM}>
                <View style={Containers.topL}>
                    <View style={Containers.flexHor}>
                        <Text style={Typography.h3}>Income Chart</Text>
                        <Text>Monthly</Text>
                    </View>
                </View>
            </View>

            <View style={Cards.incomeCard}> 
                <View style={Containers.flexHorNorm}>
                    <Text style={Cards.expenseCardTxtBold}>{change < 0 ? `${change}` : `+${change}` }</Text>
                    <Text style={Cards.expenseCardTxt}> {change < 0 ? `(${rate}%)` : `(+${rate}%)`}</Text> 
                    <Text> from last {interval}</Text> 
                </View>

                <View style={
                    {
                        marginTop: Variables.sizes.szL,
                        alignItems: 'flex-start'
                    }
                    }>
                <LineChart
                    data={data}
                    width={widthChart}
                    height={180}
                    chartConfig={chartConfig}
                    yAxisLabel={'₹'}
                    yAxisInterval={1}
                    withShadow={false}
                    withVerticalLines={false}
                    bezier
                />
                </View>
            </View>

        </View>
    )
}

export default AvailBalance