import React from 'react';

const DashboardWelcome = () => {
  return (
    <div className="dashboard_welcome">
      <div>
        <div className="welcome_title">Welcome to Ongaku!</div> <br />
        We are a music sharing <i>community</i> and we pride ourselves on our
        core values of creating a safe space for everyone to share, discover and
        enjoy music freely.
      </div>
      <div className="ongaku_text">音楽</div>
      <div className="welcome_instructions">
        <br />
        On the left you will see the public channels you have already subscribed
        to, but feel free to use the search bar to discover other channels! You
        can also create private or public channels on demand, however we really
        encourage you to look for other like minded channels to connect with.
      </div>
    </div>
  );
};

export default DashboardWelcome;
