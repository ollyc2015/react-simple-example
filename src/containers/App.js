import React, { useState, useEffect } from 'react'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
    //Using hooks rather than classes to manage state. useState returns for us a piece of state (first param) and what changes that state (second param)
    //the below state is initalised with an empty array.
    const [robots, setRobots] = useState([])
    const [searchfield, setSearchField] = useState('')

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response=> response.json())
          .then(users => {setRobots(users)});
      },[]) // second param means only run if value changes

    const onSearchChange = (event) => {
        setSearchField(event.target.value )
    }
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if (!robots.length) {   
        return <h1 className='tc'>Loading...</h1>
    } else {
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;