const {render, useState} = wp.element;

__webpack_public_path__ = "http://localhost:8083/"; // This is important, the port should be same as the devPort in webpack.config.js file.

const Votes = () => {
    const [votes, setVotes] = useState(0);
    const addVote = () => {
        setVotes(votes + 1);
    };
    return (
        <div>
            <h1>Finally I could sort it out!!</h1>
            <h2>{votes} Votes</h2>
            <p>
                <button onClick={addVote}>Vote</button>
            </p>
        </div>
    );
};

if (document.getElementById("react-root")) {
    render(<Votes/>, document.getElementById(`react-root`));
}

if (module && module.hot) {
    module.hot.accept();
}
