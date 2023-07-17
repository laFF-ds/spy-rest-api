// DISPLAY DATA IN TABLE
let url = "http://localhost:3000/agents"

let agentTable = document.querySelector('#agent-table')
let newAgentForm = document.querySelector('.new-agent-form')

let newSpecialtiesBtn = document.getElementById('new-specialties-btn')
let newToolsBtn = document.getElementById('new-tools-btn')
let newMissionsBtn = document.getElementById('new-missions-btn')
let submitButton = document.getElementById('submit-button')

let nameInput = document.getElementById('name')
let specialtiesInput = document.querySelectorAll('#specialties')
let toolsInput = document.querySelectorAll('#preferred-tools')
let numberInput = document.getElementById('number')
let locationInput = document.getElementById('location')
let combatInput = document.getElementById('preferred-combat')

let missionNameInput = document.querySelectorAll('#mission-name-input')
let missionLocationInput = document.querySelectorAll('#mission-location-input')
let missionGoalInput = document.querySelectorAll('#mission-goal-input')
let missionSuccessInput = document.querySelectorAll('#mission-success-input')
 // Display agent information
 const displayTable = (agents) => 
 {
    agents.forEach(agent => 
    {
        output = `
        <tr data-id=${agent.number}>
        <td id='agent-name'>${agent.name}</td>
        <td id='agent-number'>${agent.number}</td>
        <td id='agent-location'>${agent.location}</td>
        <td id='agent-specialties'>${agent.specialties}</td>
        <td id='agent-combat'>${agent.preferredCombat}</td>
        <td id='agent-tools'>${agent.preferredTools}</td>
        <td><a href='#' id='edit-agent'>EDIT</a></td>
        <td><a href='#' id='delete-agent'>DELETE</a></td>
        </tr>
        <tr>
            <th colspan=8 class="mission-header">Missions</th>
        </tr>
        <tbody id="${agent.number}">
        </tbody>
        `
        if (agent.number === undefined)
        {
            return
        }
        agentTable.insertAdjacentHTML("beforeend", output)

        // Display mission information for each agent
        missionBody = document.querySelectorAll(`[id="${agent.number}"]`)
        missionBody.forEach(mission => 
        {
            for (let i = 0; i < agent.missions.length; i++)
            {
                missionOutput = `<tr class="mission-data" id="mission-data${agent.number}">
                    <td id='mission-name'>${agent.missions[i].name}</td>
                    <td id='mission-location'>${agent.missions[i].location}</td>
                    <td id='mission-goal' colspan=5>${agent.missions[i].goal}</td>
                    <td id='mission-success'>${agent.missions[i].success}</td>
                </tr>`
                mission.insertAdjacentHTML("beforeend", missionOutput)
            }
            // agent.missions.forEach(mission => {
            //     console.log(mission)
            //     missionOutput = `<tr class="mission-data" id="mission-data${agent.number}">
            //         <td>${mission.name}</td>
            //         <td>${mission.location}</td>
            //         <td colspan=3>${mission.goal}</td>
            //         <td>${mission.success}</td>
            //     </tr>`
            //     mission.insertAdjacentHTML("beforeend", missionOutput)
            // })
        })
        
        // Display/Hide mission information (Default Hidden)
        displayMissions = document.querySelectorAll(".mission-header");
        hideMissions = document.querySelectorAll(".mission-header");
        // Display information
        for (let i = 0; i < displayMissions.length; i++) 
        { 
            displayMissions[i].addEventListener("click", function(e) 
            {

                missionData = document.querySelectorAll(`[id="mission-data00${i}"]`)
                missionData.forEach(mission =>
                {
                        mission.style.display = "table-row"
                })
            })
        }
        // Hide information
        for (let i = 0; i < hideMissions.length; i++) 
        { 
            hideMissions[i].addEventListener("dblclick", function(e) 
            {
                e.preventDefault()
                missionData = document.querySelectorAll(`[id="mission-data00${i}"]`)
                missionData.forEach(mission =>
                {
                        mission.style.display = "none"
                })
            })
        }
    })
}

fetch(url,
{
    method: 'GET'
})
.then(res => res.json())
.then(data => 
{
   displayTable(data)
})

agentTable.addEventListener("click", (e) => {
    // console.log(e.target.id)
    let editButtonPressed = e.target.id == "edit-agent"
    let deleteButtonPressed = e.target.id == "delete-agent"

    let agentNumber = e.target.parentElement.parentElement.dataset.id

    if(deleteButtonPressed)
    {
        fetch(`${url}/008`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(() => location.reload())
    }

    if(editButtonPressed)
    {
        const parent = e.target.parentElement.parentElement
        // Table
        let name = parent.querySelector('#agent-name').textContent
        let number = parent.querySelector('#agent-number').textContent
        let location = parent.querySelector('#agent-location').textContent
        let specialties = parent.querySelector('#agent-specialties').textContent
        let combat = parent.querySelector('#agent-combat').textContent
        let tools = parent.querySelector('#agent-tools').textContent

        let numberOfMissions = parent.closest("tbody").nextSibling.querySelectorAll('#mission-name').length 

        nameInput.value = name
        numberInput.value = number
        locationInput.value = location
        specialtiesInput.value = specialties
        combatInput.value = combat
        toolsInput.value = tools


        // Create additional mission input fields
        for (let i = 0; i < numberOfMissions - 1; i++)
        {
            html = `
            <label for="mission-name">Mission Name:</label><br />
            <input type="text" name="mission-name" id="mission-name-input" placeholder="Operation Kitten"><br />

            <label for="mission-location">Mission Location:</label><br />
            <input type="text" name="mission-location" id="mission-location-input" placeholder="Canada"><br />

            <label for="mission-goal">Mission Goal:</label><br />
            <input type="text" name="mission-goal" id="mission-goal-input" placeholder="Eliminate Red Eye"><br />

            <label for="mission-success">Mission Success:</label><br />
            <input type="text" name="mission-success" id="mission-success-input" placeholder="true"><br />`
            newMissionsBtn.insertAdjacentHTML("beforebegin", html)
        }
        // Fill in input fields with mission data
        missionNameInput = document.querySelectorAll('#mission-name-input')
        missionLocationInput = document.querySelectorAll('#mission-location-input')
        missionGoalInput = document.querySelectorAll('#mission-goal-input')
        missionSuccessInput = document.querySelectorAll('#mission-success-input')

        for (let i = 0; i < numberOfMissions; i++)
        {
            let missionName = parent.closest("tbody").nextSibling.querySelectorAll('#mission-name')[i].textContent
            let missionLocation = parent.closest("tbody").nextSibling.querySelectorAll('#mission-location')[i].textContent
            let missionGoal = parent.closest("tbody").nextSibling.querySelectorAll('#mission-goal')[i].textContent
            let missionSuccess = parent.closest("tbody").nextSibling.querySelectorAll('#mission-success')[i].textContent

            missionNameInput[i].value = missionName
            missionLocationInput[i].value = missionLocation
            missionGoalInput[i].value = missionGoal
            missionSuccessInput[i].value = missionSuccess
        }

        // Create additional specialties input fields
        for (let i = 0; i < specialtiesInput.value.split(",").length - 1; i++)
        {
            html = `
            <label for="specialties">Specialties:</label><br />
            <input type="text" id="specialties" name="specialties" placeholder="Disguise"><br />`
            newSpecialtiesBtn.insertAdjacentHTML("beforebegin", html)
        }
        // Fill in input fields with agent specialties data
        specialtiesInput = document.querySelectorAll('#specialties')
        
        for (let i = 0; i < specialtiesInput.length; i++)
        {
            specialtiesInput[i].value = specialties.split(",")[i]
        }

        // Create additional Tools input fields
        for (let i = 0; i < toolsInput.value.split(",").length - 1; i++)
        {
            html = `
            <label for="preferred-tools">Preferred Tools:</label><br />
            <input type="text" id="preferred-tools" name="preferred-tools" placeholder="Drone"><br />`
            newToolsBtn.insertAdjacentHTML("beforebegin", html)
        }
        // Fill in input fields with agent tools data
        toolsInput = document.querySelectorAll('#preferred-tools')
        for (let i = 0; i < toolsInput.length; i++)
        {
            toolsInput[i].value = tools.split(",")[i]
        }
    }
    submitButton.addEventListener('click', () => 
    {
        console.log("updated")
        let specialtiesArr = []
        let toolsArr = []
        let missionsArr = []

        specialtiesInput.forEach(input => 
        {
            specialtiesArr.push(input.value)
        })

        toolsInput.forEach(input => 
        {
            toolsArr.push(input.value)
        })
    
        for (let i = 0; i < missionNameInput.length; i++)
        {
            missionsArr.push(
            {
                name: missionNameInput[i].value, 
                location: missionLocationInput[i].value, 
                goal: missionGoalInput[i].value,
                success: missionSuccessInput[i].value
            })
        }
        specialtiesArr = specialtiesArr.filter(e => String(e).trim())
        toolsArr = toolsArr.filter(e => String(e).trim())
        missionsArr = missionsArr.filter(e => String(e).trim())

        fetch(`${url}/008`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                number: numberInput.value,
                location: locationInput.value,
                specialties: specialtiesArr,
                preferredCombat: combatInput.value,
                preferredTools: toolsArr,
                missions: missionsArr
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
        .then(() => {
            specialtiesInput.forEach(input => 
                {
                    input.value = ''
                })
            
                toolsInput.forEach(input => 
                {
                    input.value = ''
                })
            
                for (let i = 0; i < missionNameInput.length; i++)
                {
                    missionNameInput[i].value = ''
                    missionLocationInput[i].value = ''
                    missionGoalInput[i].value = ''
                    missionSuccessInput[i].value = ''
                }
        })
    })
    
})

// Create Agents
// Buttons to add additionial input fields
newSpecialtiesBtn.addEventListener("click", (e) => {
    html = `
    <label for="specialties">Specialties:</label><br />
    <input type="text" id="specialties" name="specialties" placeholder="Disguise"><br />`
    newSpecialtiesBtn.insertAdjacentHTML("beforebegin", html)
})

newToolsBtn.addEventListener("click", (e) => {
    html = `
    <label for="preferred-tools">Preferred Tools:</label><br />
    <input type="text" id="preferred-tools" name="preferred-tools" placeholder="Drone"><br />`
    newToolsBtn.insertAdjacentHTML("beforebegin", html)
})

newMissionsBtn.addEventListener("click", (e) => {
    html = `
    <label for="mission-name">Mission Name:</label><br />
    <input type="text" name="mission-name" id="mission-name-input" placeholder="Operation Kitten"><br />

    <label for="mission-location">Mission Location:</label><br />
    <input type="text" name="mission-location" id="mission-location-input" placeholder="Canada"><br />

    <label for="mission-goal">Mission Goal:</label><br />
    <input type="text" name="mission-goal" id="mission-goal-input" placeholder="Eliminate Red Eye"><br />

    <label for="mission-success">Mission Success:</label><br />
    <input type="text" name="mission-success" id="mission-success-input" placeholder="true"><br />`
    newMissionsBtn.insertAdjacentHTML("beforebegin", html)
})

// POST New Agent
newAgentForm.addEventListener("submit", (e) => 
{
    e.preventDefault()
    specialtiesInput = document.querySelectorAll('#specialties')
    toolsInput = document.querySelectorAll('#preferred-tools')
    missionNameInput = document.querySelectorAll('#mission-name-input')
    missionLocationInput = document.querySelectorAll('#mission-location-input')
    missionGoalInput = document.querySelectorAll('#mission-goal-input')
    missionSuccessInput = document.querySelectorAll('#mission-success-input')

    let specialtiesArr = []
    let toolsArr = []
    let missionsArr = []

    specialtiesInput.forEach(input => 
    {
        specialtiesArr.push(input.value)
    })

    toolsInput.forEach(input => 
    {
        toolsArr.push(input.value)
    })

    for (let i = 0; i < missionNameInput.length; i++)
    {
        missionsArr.push(
        {
            name: missionNameInput[i].value, 
            location: missionLocationInput[i].value, 
            goal: missionGoalInput[i].value,
            success: missionSuccessInput[i].value
        })
    }

    specialtiesArr = specialtiesArr.filter(e => String(e).trim())
    toolsArr = toolsArr.filter(e => String(e).trim())
    missionsArr = missionsArr.filter(e => String(e).trim())

    fetch(url,
    {
        method: 'POST',
        headers: 
        {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameInput.value,
            number: numberInput.value,
            location: locationInput.value,
            specialties: specialtiesArr,
            preferredCombat: combatInput.value,
            preferredTools: toolsArr,
            missions: missionsArr
            // {
            //     name: missionNameInput.value, 
            //     location: missionLocationInput.value,
            //     goal: missionGoalInput.value,
            //     success: missionSuccessInput.value 
            // }
        })
    })
    .then(res => res.json())
    .then(data => 
    {
        dataArr = []
        dataArr.push(data)
        displayTable(dataArr)
    })
    nameInput.value = ''
    numberInput.value = ''
    locationInput.value = ''
    combatInput.value = ''
    specialtiesInput.forEach(input => 
    {
        input.value = ''
    })

    toolsInput.forEach(input => 
    {
        input.value = ''
    })

    for (let i = 0; i < missionNameInput.length; i++)
    {
        missionNameInput[i].value = ''
        missionLocationInput[i].value = ''
        missionGoalInput[i].value = ''
        missionSuccessInput[i].value = ''
    }
})
