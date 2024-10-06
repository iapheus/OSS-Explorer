import { Select, Flex, TextField, Button } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getData } from '../../../app/slices/apiCordinatesSlice';

export default function Navbar() {
    const dispatch = useDispatch();

    const [locationSelect, setLocationSelect] = useState('İstanbul');
    const [locationInput, setLocationInput] = useState('');

    const [tagSelect, setTagSelect] = useState('amenity');
    const [keySelect, setKeySelect] = useState('toilets');

    const [manualTagAndKey, setManualTagAndKey] = useState('');

    const[locationDisable, setLocationDisable] = useState(false);
    const[tagAndKeyDisable, setTagAndKeyDisable] = useState(false);

    const locationInputFunc = (e) => {
        if (e.target.value === '') {
            setLocationDisable(false);
        }
        else if (e.target.value !== '') {
            setLocationDisable(true);
            setLocationInput(e.target.value);
            setLocationSelect('');
        }
    }

    const manualTagAndKeyInputFunc = (e) => {
        if (e.target.value === '') {
            setTagAndKeyDisable(false);
        }
        else if (e.target.value !== '') {
            setTagAndKeyDisable(true);
            setManualTagAndKey(e.target.value);
            setTagSelect('');
            setKeySelect('');
        }
    }

    const searchClicked = () => {
        let tag,key;

        if (locationSelect && tagSelect && keySelect) {
            dispatch(getData({ cityName: locationSelect, key: keySelect, tag: tagSelect }))
        } else if (locationInput && tagSelect && keySelect) {
            dispatch(getData({ cityName: locationInput, key: keySelect, tag: tagSelect }))
        } else if (locationInput && manualTagAndKey) {
            const parts = manualTagAndKey.split('=');
            if (parts.length === 2) {
                tag = parts[0];
                key = parts[1];
                dispatch(getData({ cityName: locationInput, key, tag}))
            } else {
                console.error("manualTagAndKey is not in the correct format!");
                return null;
            }
        } else if (locationSelect && manualTagAndKey) {
            const parts = manualTagAndKey.split('=');
            if (parts.length === 2) {
                tag = parts[0];
                key = parts[1];
                dispatch(getData({ cityName: locationSelect, key, tag}))
            } else {
                console.error("manualTagAndKey is not in the correct format!");
                return null;
            }
        } else {
            console.error("Invalid combination of parameters!");
            return null;
        }
    }

    return (
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-center lg:space-y-0 lg:space-x-8 p-4">
            <div className="ml-4 flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                <div className="flex items-center space-x-2">
                <p className="text-center lg:mt-1">Location:</p>
                    <Select.Root defaultValue="İstanbul" disabled={locationDisable} onValueChange={setLocationSelect}>
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                                <Select.Label>Türkiye</Select.Label>
                                <Select.Item value="İstanbul">İstanbul</Select.Item>
                                <Select.Item value="Ankara">Ankara</Select.Item>
                                <Select.Item value="İzmir">İzmir</Select.Item>
                            </Select.Group>
                            <Select.Separator />
                            <Select.Group>
                                <Select.Label>Europe</Select.Label>
                                <Select.Item value="Berlin">Berlin</Select.Item>
                                <Select.Item value="Amsterdam">Amsterdam</Select.Item>
                                <Select.Item value="Sofia">Sofia</Select.Item>
                            </Select.Group>
                            <Select.Separator />
                            <Select.Group>
                                <Select.Label>USA</Select.Label>
                                <Select.Item value="California">California</Select.Item>
                                <Select.Item value="Los Angeles">Los Angeles</Select.Item>
                                <Select.Item value="Michigan">Michigan</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                    <p className="text-center">or</p>
                    <TextField.Root onChange={(e) => locationInputFunc(e)} variant="surface" placeholder="type here..." className="w-48" />
                </div>
            </div>

            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
                <div className="flex items-center justify-center space-x-2">
                    <p className="text-center">Tag:</p>
                    <Select.Root defaultValue="amenity" disabled={tagAndKeyDisable} onValueChange={setTagSelect}>
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="amenity">Amenity</Select.Item>
                                <Select.Item value="building">Building</Select.Item>
                                <Select.Item value="natural">Natural</Select.Item>
                                <Select.Item value="man_made">Man Made</Select.Item>
                                <Select.Item value="historic">Historic</Select.Item>
                                <Select.Item value="emergency">Emergency</Select.Item>
                                <Select.Item value="healthcare">Healthcare</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                <p className="text-center">&</p>
                <p className="text-center">Key:</p>
                    <Select.Root defaultValue="toilets" disabled={tagAndKeyDisable} onValueChange={setKeySelect}>
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Group>
                                <Select.Item value="toilets">Toilets</Select.Item>
                                <Select.Item value="building">Building</Select.Item>
                                <Select.Item value="natural">Natural</Select.Item>
                                <Select.Item value="man_made">Man Made</Select.Item>
                                <Select.Item value="historic">Historic</Select.Item>
                                <Select.Item value="emergency">Emergency</Select.Item>
                                <Select.Item value="healthcare">Healthcare</Select.Item>
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                </div>



                <p className="text-center">or</p>
                <Flex className="w-full lg:w-48" direction="column">
                    <TextField.Root onChange={(e) => manualTagAndKeyInputFunc(e)} variant="surface" placeholder="e.g. tag=key" />
                </Flex>
            </div>

            <div className="flex justify-center lg:justify-start lg:my-4">
                <Button variant="outline" onClick={searchClicked}>
                    Search <MagnifyingGlassIcon />
                </Button>
            </div>
        </div>
    );
}
