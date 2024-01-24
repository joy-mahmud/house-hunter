import { useState } from 'react';
import banner from '../../assets/modern-residential-district-with-green-roof-balcony-generated-by-ai.jpg'
import './home.css'
import MultiRangeSlider from "multi-range-slider-react";
const Home = () => {
    const [minValue, set_minValue] = useState(5);
    const [maxValue, set_maxValue] = useState(30);
    const handleInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    return (
        <div>
            <div className='container mx-auto relative'>
                <div className='container bg mx-auto absolute flex flex-col justify-center items-center h-[570px] left-0 top-0 bg-'>
                    <h2 className='text-5xl mb-12 text-white font-semibold'>Welcome to HouseHunter</h2>
                    <div className='bg-white w-[90%] p-5 grid grid-cols-3 gap-2'>

                        <select defaultValue={"selected"} className="select select-bordered w-full">
                            <option value={"selected"} disabled>Select city?</option>
                            <option>Han Solo</option>
                            <option>Greedo</option>
                        </select>
                        <input type="number" placeholder="Bedrooms?" className="input input-bordered w-full" />
                        <input type="number" placeholder="Bathrooms?" className="input input-bordered w-full" />
                        <select defaultValue={"selected"} className="select select-bordered w-full ">
                            <option disabled value={"selected"}>Room size?</option>
                            <option>small</option>
                            <option>medium</option>
                            <option>large</option>
                        </select>

                        <div className=' flex gap-2 col-span-2 justify-center items-center'>
                            <select defaultValue={'selected'} className="select select-bordered w-[30%]">
                                <option disabled value={'selected'}>Availability?</option>
                                <option>available</option>
                                <option>booked</option>
                                <option>rented</option>
                            </select>
                            <p>Price:</p>
                            <MultiRangeSlider
                                className='flex-1'
                                min={0}
                                max={60}
                                label={false}
                                step={5}
                                ruler={false}
                                minValue={minValue}
                                maxValue={maxValue}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                            />
                            <p className='border-2 rounded-lg py-3 px-2'>min:$ {minValue}k max:$ {maxValue}k</p>
                        </div>

                    </div>
                    <button className='text-white  text-2xl px-5 py-3 my-5 w-[200px] rounded-lg bg-[#57B45B]'>search</button>
                </div>


                <img className='w-full h-[570px]' src={banner} alt="" />
            </div>
        </div>
    );
};

export default Home;