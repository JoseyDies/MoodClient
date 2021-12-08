import React from 'react';
import CreateGoal from './CreateGoal';
import GetGoal from './GetGoal';

export interface GoalProps {
    token: string,
       
    
}
const Goal = (props: { token: string }) => {

    return (
        <div>
            <CreateGoal token={props.token}/>
            <GetGoal token={props.token}/>
            <p>This is the goal page.</p>
        </div>
    );

}

export default Goal;
