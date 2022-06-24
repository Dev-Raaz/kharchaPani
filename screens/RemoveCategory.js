import {Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'

//styles
import Containers from '../styles/containers'
import Typography from '../styles/typography'
import Buttons from '../styles/buttons'
import FormInputs from '../styles/forminputs'
import DeleteIcon from '../assets/buttons/delete'

import { AuthContext } from '../components/context'
import { useContext, useEffect, useState } from 'react'
import Variables from '../styles/variables'
import axios from 'axios'
import API_BASE from '../config/api'


const Category = ({name, type, count, id, setShouldDelete, setCatId}) => {

    //This guy has the key
    
    return (
        <View style={styles.catCard}>
                <View>
                    <Text style={Typography.h3}>{name || 'Category Name'}</Text>
                    
                    <View style={styles.horFlex}>
                        <Text style={type == 'income' ? styles.typeIncome : styles.typeExpense}>{type || 'Type'}</Text>
                        <Text style={styles.count}>
                            {
                                count > 1 
                                ? `${count} transactions`
                                : `${count} transaction`
                            } 
                        </Text>
                    </View>
                </View>

                <TouchableOpacity onPress={()=>
                    {
                        setShouldDelete(true)
                        setCatId(id)
                    }}>
                    <DeleteIcon/>
                </TouchableOpacity>

            </View>
    )
}


const ShouldDeleteCategory = ({setShouldDelete, catId, setCatId, changed, setChanged, loading, setLoading}) => {

    const deleteCategory = async() => {
        setLoading(true)
        try{
            console.log(catId)
            const {data} = await axios.delete(`${API_BASE}/categories/${catId}`)
            setShouldDelete(false)
            setChanged(!changed)
            setLoading(false)

            console.log(`Deleted: ${data.name}`)
        }catch(err){
            console.log(`Error while deleting`)
        }
    }


    return (
        <View style={styles.delCat}>
            <View>
                <Text style={Typography.h3}>Are your sure ?</Text>
                <View style={Containers.topM}>
                    <Text style={Typography.p}>Deleting this category will delete all the transactions under this category.</Text>
                </View>
            </View>


            <View style={styles.delCatBtns}>
                <TouchableOpacity style={Buttons.btnSec} onPress={()=>{
                    setShouldDelete(false)
                    console.log(catId)
                    setCatId(null)
                }}>
                  <Text style={Buttons.btnSecTxt}>Cancel</Text>  
                </TouchableOpacity>

                <View style={styles.marLeft}>
                    <TouchableOpacity style={Buttons.btnPrm} onPress={deleteCategory}>
                        <Text style={Buttons.btnPrmTxt}>
                            {
                                loading ? 'Deleting . . .' : 'Confirm'
                            }
                        </Text>  
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const RemoveCategory = ({})=> {

    const [categories, setCategories] = useState(null)
    const [shouldDelete, setShouldDelete] = useState(false)
    const [catId, setCatId] = useState(null)
    const [changed, setChanged] = useState(false)
    const [loading, setLoading] = useState(false)

    const {getUserName} = useContext(AuthContext)

    //Initializing The Component
    useEffect(()=>{
        getCategories()
    },[changed])

    //Get User Categories
    const getCategories = async ()=> {
        const username = getUserName()
        console.log(username)
        try{
            const {data} = await axios.get(`${API_BASE}/categories/user/${username}`)

            //setting categories . . .
            setCategories(data)
        }catch(err){
            console.log(`Error while getting the categories: ${err}`)
        }
    }

    return (
        <SafeAreaView style={{height: '100%'}}>
            <ScrollView style={{padding: 16, backgroundColor: 'white'}} showsVerticalScrollIndicator={false}>
            {
                categories
                ? categories.map((cat)=>{
                    return (
                        <Category
                        setCatId={setCatId}
                        setShouldDelete={setShouldDelete} 
                        name={cat.name} type={cat.type} count={cat.transactions.length} key={cat._id} id={cat._id}/>
                    )
                })
                : null

            }
            </ScrollView>

            {
                shouldDelete
                ? <ShouldDeleteCategory
                setChanged={setChanged}
                changed={changed} 
                loading={loading}
                setLoading={setLoading}
                setShouldDelete={setShouldDelete} setCatId={setCatId} catId={catId}/>
                : null
            }
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    catCard: {
        width: '100%',
        padding: Variables.sizes.szS,
        borderRadius: Variables.radius.m,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Variables.color.secColor,
        marginTop: Variables.sizes.szM,
        borderWidth: 1, 
        borderStyle: 'solid',
        borderColor: '#e7e7e7'
    },

    horFlex: {
        flexDirection: 'row',
        marginTop: Variables.sizes.szS
    },

    typeIncome: {
        fontWeight: 'bold',
        color: Variables.color.success
    },

    typeExpense: {
        fontWeight: 'bold',
        color: Variables.color.error
    },

    count: {
        fontWeight: 'bold',
        color: Variables.color.prmColor,
        marginLeft: 8
    },
    delCat: {
        padding: Variables.sizes.szM,
        borderRadius: Variables.radius.m,
        backgroundColor: Variables.color.secColor,
        elevation: 10,
        position: 'absolute',
        top: 100,
        zIndex: 9,
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 200
    },

    delCatBtns: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    marLeft: {
        marginLeft: Variables.sizes.szM
    }
})

export default RemoveCategory