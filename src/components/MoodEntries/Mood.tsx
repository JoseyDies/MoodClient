import React from 'react';
import CreateMood from './CreateMood';
import GetMood from './GetMood';

export interface MoodProps {
    token: string,
       
    
}
const Mood = (props: { token: string }) => {

    return (
        <div>
            <CreateMood token={props.token}/>
            <GetMood token={props.token}/>
            
            <p>This is the mood page.</p>
        </div>
    );

}

export default Mood;
