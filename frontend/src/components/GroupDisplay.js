import React, { useState, useEffect } from 'react';

import EventBox from '../components/EventBox';

var adminVar = [];
var memberVar = [];

function GroupDisplay(props)
{
    var userId = "Test User"; //TODO: Dummy value, should be set in UseEffect().

    const[groupTitle, setGroupTitle] = useState('');
    const[groupDesc, setGroupDesc] = useState('');
    const[adminList, setAdminList] = useState('');
    const[memberList, setMemberList] = useState('');
    const[eventList, setEventList] = useState('');
    const[joinLeaveButton, setJoinLeaveButton] = useState("Join");

    useEffect(() => {
        //TODO: Here, we would normally pull the group ID from the URL, get the group via API, 
        // and use it to get the group's data, but we'll use dummy data for now.

        var thisGroup={
            name: "NerdKnighteria of UCF",
            description: "This club is for people at UCF interested in board and video games; we meet Tuesdays at 5 in the Student Union.",
            admins: ["John Smith", "Alyx Reckahn", "Hannah Wrigley"],
            members: ["Member 1", "Louis Ferguson", "Isabelle Bathory"],
            events:[
                {
                    title: "Sunday Practice for Orlando Tennis Club",
                    group: "Women's Tennis Club of Orlando",
                    time: "April 23rd, 2021 2:00 PM",
                    place: "Big Win Gym, 4913 Greensteel Drive, Orlando, FL, 32828"
                },
                {
                    title: "Weekly D&D Night, Newcomers Welcome",
                    group: "",
                    time: "April 21st, 2021 8:00 PM",
                    place: "2123 Rose Lane, Orlando, FL, 32819"
                },
                {
                    title: "JavaScript Workshop",
                    group: "Programming Club of UCF",
                    time: "April 26th, 2021 3:00 PM",
                    place: "Online"
                },
                {
                    title: "Super Smash Bros Tournament - Cash Prizes",
                    group: "NerdKnighteria of UCF",
                    time: "May 12th, 2021 5:00 PM",
                    place: "Online"
                },
                {
                    title: "April Meeting of Jacaranda Book Club",
                    group: "Jacaranda Book Club",
                    time: "April 6th, 2021 1:00PM",
                    place: "4143 Woodmere Park Blvd, Venice, FL 34293"
                }
            ]
        };

        setGroupTitle(thisGroup.name + "\nGroup ID: " + props.groupId); //To test the parameter pass-in.
        setGroupDesc(thisGroup.description);
        setAdminList(<div><p>{makeUsernameList(thisGroup.admins)}</p></div>);
        adminVar = thisGroup.admins;
        setMemberList(<div><p>{makeUsernameList(thisGroup.members)}</p></div>);
        memberVar = thisGroup.members; //So we can track the admins and members outside of useEffect.

        // For each event, make an EventBox with its data.
        setEventList(thisGroup.events.map((eventData) => (
            <EventBox title={eventData.title}
                group={eventData.group}
                // Ensures dates are in: Month Day, Year Time format
                time={new Date(eventData.time).toLocaleString('en-us', {year: 'numeric', month: 'long', day: '2-digit'}).
                replace(/(\d+)\/(\d+)\/(\d+)/, '$1-$2-$3') + " " + new Date(eventData.time).toLocaleTimeString()}
                place={eventData.place}/>)));

        // Flip the status of the join/leave button to Leave if the user has joined the group.
        if(thisGroup.members.indexOf(userId) != -1)
        {
            setJoinLeaveButton("Leave");
        }
    }, []);

    // This function handles the user clicking the Join/Leave button.
    function joinOrLeave()
    {
        if (memberVar.indexOf(userId) != -1) //User is a member, so remove them.
        {
            alert("TODO: use API to remove from group.");
            memberVar = memberVar.filter(user => user !== userId);
            setMemberList(<div><p>{makeUsernameList(memberVar)}</p></div>);
            setJoinLeaveButton("Join");
        }
        else //User is not a member, so add them.
        {
            alert("TODO: use API to add to group.");
            memberVar = [...memberVar, userId];
            setMemberList(<div><p>{makeUsernameList(memberVar)}</p></div>);
            setJoinLeaveButton("Leave");
        }
    }

    // Turn an array of users into a comma-separated string.
    function makeUsernameList(users)
    {
        var userList = "";
        for (var i = 0; i < users.length; i++)
        {
            userList += users[i];
            if (i < users.length-1)
            {
                userList += ", ";
            }
        }
        return userList;
    }

    return(
        <div id="mainDiv" style={{width: "80%"}}>
            <br /><p style={{fontSize: "50px", marginTop: "0px", marginLeft: "15px", marginRight: "15px"}}>{groupTitle}</p>
            <p>Adminned by: {adminList}</p>
            {/* Display the edit button to admins and the enroll checkbox to other users.*/}
            {

                adminVar.indexOf(userId) != -1 ?
                <button type="button" style={{width: "40%"}} class="buttons" 
                    onClick={() => window.location.href="/editgroup/" + props.groupId}>
                    Edit/Disband Group</button>
                :
                <div>
                    <button type="button" style={{width: "40%"}} class="buttons" 
                    onClick={joinOrLeave}>{joinLeaveButton}</button>
                </div>
            }
            <span class="inner-title"></span><br />
            <img src="https://image.cnbcfm.com/api/v1/image/104151701-GettyImages-143949731.jpg?v=1481108000&w=1600&h=900" class="imgeventpage"/><br/>

            <br /><span class="inner-title it_orange">Group Information</span><br />

            <div>
                <p style={{marginLeft: "30px", marginRight: "30px"}}>{groupDesc}</p>
            </div>
            <span class="inner-title it_orange"></span><br />

            <div>
            <span class="inner-title it_yellow">Group Members</span>
                {memberList}
                {/* <CommentBlock comments={eventComments} submitCommand={addComment}/> */}
            <span class="inner-title it_yellow"></span>
            
            </div>

            <div>
            <span class="inner-title it_green">Events Hosted</span>
                <div class = "flex-container">
                    {eventList}
                </div>
            </div>

        </div>
        
    )
}

export default GroupDisplay;