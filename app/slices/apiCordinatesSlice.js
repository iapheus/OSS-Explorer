import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    value: []
}

export const getOsmID = async (cityName) => {
        try {
            if(cityName == 'Istanbul' || cityName == 'İstanbul') return 223474 + 3600000000;
            if(cityName == 'Bursa') return 223463 + 3600000000;
            let response = await axios.get(`https://nominatim.openstreetmap.org/search?X-Requested-With=overpass-turbo&format=json&q=${cityName}`);
            response = response.data.filter((item) => item.addresstype === "province" ||
                                                      item.addresstype === "state"||
                                                      item.addresstype === "city");
            return response[0].osm_id + 3600000000;
        } catch (error) {
            throw error;
        }
};

export const getData = createAsyncThunk(
    'getData',
    async ({cityName,key,tag}) => {
        try {
            const osm_id = await getOsmID(cityName);
            const queryData = `data=%2F*%0AThis+has+been+generated+by+the+overpass-turbo+wizard.%0AThe+original+search+was%3A%0A%E2%80%9C${tag}%3D${key}+in+${cityName}%E2%80%9D%0A*%2F%0A%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A%2F%2F+fetch+area+%E2%80%9C${cityName}%E2%80%9D+to+search+in%0Aarea(id%3A${osm_id})-%3E.searchArea%3B%0A%2F%2F+gather+results%0Anwr%5B%22${tag}%22%3D%22${key}%22%5D(area.searchArea)%3B%0A%2F%2F+print+results%0Aout+geom%3B`;
            let response = await axios.post(`https://overpass-api.de/api/interpreter`, queryData);
            return response.data.elements;
        } catch (error) {
            throw error;
        }
    }
);

export const apiCordinatesSlice = createSlice({
    name: 'apiCordinatesSlice',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state,action) => {
            state.value = action.payload;  
        })
    }
})



export default apiCordinatesSlice.reducer