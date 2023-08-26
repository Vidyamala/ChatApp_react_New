import "./Badges.css"
function Badges({ setSelectedPersons, selectedPersons }) {
    console.log(selectedPersons)
    const removePerson=(item)=>{
        console.log("hello")
      const newselected=  selectedPersons.filter((i)=>{
           return i.userId!=item
        })
        setSelectedPersons(newselected)
    }
    return (
        <div className="badge-container">
            {selectedPersons.map((item) => {
                return <div className="badges">
                    <div className="userId">{item.userId}</div>
                    <div className={"close"} onClick={()=>{removePerson(item.userId)}}> <i class="bi bi-x"></i></div>
                </div>
            })}
        </div>
    )
}
export default Badges;






