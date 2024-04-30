import Solo from "../assets/solo.png"
import Summon from "../assets/Summon.png"
import Create from "../assets/room.png"
import Join from "../assets/join.png"
import SoloP from "../assets/solo p.png"

export let practices = [
    {
        title:"Solo leveling",
        description: "Practice your python skill without any collaboration (Playground).",
        image:Solo,
        mode:"solo"
    },
    {
        title:"Arise",
        description: "Practice your python skill without any collaboration (Playground).",
        image:Solo,
        mode:"collab"
    },
    {
        title:"Summon",
        description: "Practice your python skill without any collaboration (Playground).",
        image:Summon,
        mode:"join"
    }
]

export let professional = [
    {
        title:"Playground",
        description: "Practice your python skill without any collaboration (Playground).",
        image:SoloP,
        mode:"solo"
    },
    {
        title:"Create a room",
        description: "A separate room for share your knowledge with others.",
        image:Create,
        mode:"collab"
    },
    {
        title:"Join a room",
        description: "Developing your skill knowledge with others.",
        image:Join,
        mode:"join"
    }
]