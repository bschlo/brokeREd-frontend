import '../Dashboard/Dashboard.css'

const Dashboard = () => {
    const username = localStorage.getItem('username')
    

    return (
      <div className='dashboard-main'>
        <h1>Welcome, {username}</h1>
        <p>
          This is the dashboard page where you, and only you, can see a dashboard
          of all of your things.
        </p>
      </div>
    );
  };
  
  export default Dashboard;