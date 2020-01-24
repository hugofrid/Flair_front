import React, { useState, useEffect } from 'react';
import './CityList.css'
import { capitalize } from '../../../pipes/stringpipe.js'
import IconBtn from '../../../componants/iconBtn/iconBtn.js';
import { closeIcon, listIcon, sortDscIcon, sortAscIcon } from '../../../icons/icons.js'
import JaugeBar from '../../../componants/jaugeBar/jaugeBar';
import SearchInput from '../../../componants/searchInput/SearchInput.js'


function CityList(props) {

    const sortByCityName = (a, b) => {
        if (a.properties.city_name < b.properties.city_name)
            return -1;
        if (a.properties.city_name > b.properties.city_name)
            return 1;
        return 0;
    }

    const sortFeatures = (featureList) => {

        if (featureList) {
            let list = [];
            featureList.map(elem => {
                if (!list[elem.properties[props.displayedInfo]]) {
                    list[elem.properties[props.displayedInfo]] = []
                }
                list[elem.properties[props.displayedInfo]].push(elem)

            })
            list.forEach(elem => elem.sort(sortByCityName));
            let arrayList;
            if (orderList === '-') {
                arrayList = list.reduce((accumulator, object) => accumulator = [...accumulator, ...object])
            }
            if (orderList === '+') {

                arrayList = list.reverse().reduce((accumulator, object) => accumulator = [...accumulator, ...object])
            }
            return arrayList;
        }

    }


    const [loadLimite, setLoadLimite] = useState(100);
    const [orderList, setOrderList] = useState("+");


    useEffect(() => { setFilteredList(sortFeatures(filteredList)) }, [orderList])

    const [featureList, setFeatureList] = useState(sortFeatures(props.features));
    const [filteredList, setFilteredList] = useState(featureList);



    const reduceList = () => {
        props.setShowCityList(!props.showCityList);
    }

    const colors = '#ef2917,#ed4a00,#e86400,#de7c00,#d09100,#bfa500, #a9b700,#8dc800, #67d800, #01e70b'
    return (
        <div className={"listComponent " + (props.showCityList ? "isOpen" : "")}>

            <IconBtn className={("toggleIcon ") + (props.showCityList && "closeIcon")} icon={props.showCityList ? closeIcon : listIcon} onClick={reduceList}></IconBtn>


            {props.showCityList && featureList && featureList.length && loadLimite &&
                <div className="visibleList">


                    <IconBtn className="listOrder" icon={orderList === "+" ? sortDscIcon : sortAscIcon} onClick={() => orderList === "+" ? setOrderList("-") : setOrderList("+")}></IconBtn>

                    <SearchInput arraySource={featureList} returnedArray={(elem) => setFilteredList(elem)}></SearchInput>


                    <div className="list">
                        {

                            filteredList.slice(0, loadLimite).map((elem, index) =>

                                <div className={"city " + ((elem.properties === props.activeFeature) ? "selected" : "")} key={index}
                                    onClick={() => {
                                        props.onClickFeature(elem, index);

                                    }}

                                >
                                    <div className="cityName">  {capitalize(elem.properties.city_name)}  - {elem.properties.codePostal}</div>
                                    <div >
                                        <JaugeBar colors={colors} point={elem.properties[props.displayedInfo]} ></JaugeBar>
                                    </div>
                                </div>)

                        }{(loadLimite <= filteredList.length) &&
                            <div className="showMore" onClick={() => setLoadLimite(loadLimite + 100)}>voir plus </div>}
                    </div>
                </div>
            }

        </div>
    )

}
export default CityList;