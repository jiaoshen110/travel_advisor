import React,{useState, useEffect} from 'react'
import { CssBaseline,Grid } from '@material-ui/core';

import { getPlacesData } from './api';

import Header from './components/Header/Header';
import List from './components/List/List'
import Map from './components/Map/Map'


function App() {
    const [places,setPlaces] =useState([]);
    const [childClicked, setChildClicked] = useState(null);


    const [coords, setCoords] = useState({});
    const [bounds, setBounds] = useState({ne:'',sw:''});

    const [type,setType] = useState();
    const [rating,setRating] = useState();

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lng: longitude });
        });
      }, []);
    useEffect(()=>{
        // console.log(coords,bounds)
        setIsLoading(true);
        getPlacesData(type, bounds.sw,bounds.ne)
            .then((data)=>{
                // console.log(data)
                setPlaces(data);
                setIsLoading(false)
            })
    },[type,coords,bounds])
    return (
        <>
            <CssBaseline/>
            <Header/>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List places={places} 
                        childClicked={childClicked} 
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />      
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoords={setCoords}
                        setBounds={setBounds}
                        coords={coords}
                        bounds={bounds}
                        places={places}
                        setChildClicked={setChildClicked}
                    />      
                </Grid>
            </Grid>
        </>
    )
}

export default App;

