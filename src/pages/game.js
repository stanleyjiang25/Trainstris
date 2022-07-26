import React from 'react';
import './game.css';

function Square(props) {
  if (props.value === 'X') {
    return (
      <button className="square" onClick={props.onClick} style={{ backgroundColor: 'aqua' }} />
    )
  }
  else {
    return (
      <button className="square" onClick={props.onClick} style={{ backgroundColor: 'white' }} />
    )
  }
}

class Board extends React.Component {
  renderSquare(i, j) {
    return (
      <Square key={100 * i + j} value={this.props.squares[i][j]}
        onClick={() => this.props.onClick(i, j)} />
    );
  }
  renderBoardRow(i) {
    var row = [];
    for (var j = 0; j < 10; j++) {
      row.push(this.renderSquare(i, j));
    }
    return (
      <div key={i} className="board-row">{row}</div>
    );
  }
  renderBoard() {
    var rows = [];
    for (var i = 0; i < 20; i++) {
      rows.push(this.renderBoardRow(i));
    }
    return (rows);
  }

  render() {
    return (
      <div>
        <br></br>
        {this.renderBoard()}
      </div>
    );
  }
}

function Level(props) {
  let text;
  if (props.active) {
    text = '#2dc997';
  }
  else {
    text = 'white';
  }
  return (
    <button className="level" onClick={props.onClick} style={{ backgroundColor: text, width: props.width }}>
      {props.value}
    </button >
  )
}

class LevelSelect extends React.Component {
  renderLevel(i) {
    let act;
    if (this.props.level === i) {
      act = true;
    }
    else {
      act = false;
    }
    if (i === 16) {
      return (
        <Level key={i} value={"Sandbox"} active={act} width={"130px"}
          onClick={() => this.props.onClick(i)} />
      )
    }
    else if (i !== 0) {
      return (
        <Level key={i} value={i} active={act} width={"40px"}
          onClick={() => this.props.onClick(i)} />
      );
    }
    else {
      return (
        <Level key={i} value={"Intro"} active={act} width={"130px"}
          onClick={() => this.props.onClick(i)} />
      )
    }
  }
  renderLevelRow(i) {
    var row = [];
    for (var j = 1; j <= 3; j++) {
      row.push(this.renderLevel(3 * i + j));
    }
    return (
      <div key={i} className="board-row">{row}</div>
    );
  }
  renderLevelSelect() {
    var rows = [];
    rows.push(<div key={999} className="board-row">{this.renderLevel(0)}</div>)
    for (var i = 0; i < 5; i++) {
      rows.push(this.renderLevelRow(i));
    }
    rows.push(<div key={998} className="board-row">{this.renderLevel(16)}</div>)
    return (rows);
  }

  render() {
    return (
      <div>
        <br></br>
        {"Level select:"}
        <br></br>
        {this.renderLevelSelect()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    let array20 = [];
    for (var i = 0; i < 20; i++) {
      let array10 = [];
      for (var j = 0; j < 10; j++) {
        array10.push(false);
      }
      array20.push(array10);
    }

    this.state = {
      evaluating: true,
      squares: array20,
      level: 0,
      reveal: false,
      time: 0.0,
      piece: 0
    }
  }
  handleClick(i, j) {
    if (this.state.evaluating) {
      const squares = this.state.squares.slice();
      if (squares[i][j] === false) {
        squares[i][j] = 'X';
      }
      else {
        squares[i][j] = false;
      }
      this.setState({ squares: squares })
    }
  }

  handleLevelClick(i) {
    this.clear();
    this.setState({ level: i, reveal: false });
  }

  submit() {
    const eval1 = this.state.evaluating;
    if (eval1) {
      this.setState({ evaluating: false });
    }

  }
  clear() {
    let array20 = [];
    for (var i = 0; i < 20; i++) {
      let array10 = [];
      for (var j = 0; j < 10; j++) {
        array10.push(false);
      }
      array20.push(array10);
    }
    this.setState({ evaluating: true, squares: array20 });
  }
  reveal() {
    this.setState({ reveal: true });
  }
  handleTime(e) {
    // const re = /^[0-9]{1,3}(\.[0-9]{1,3})?$/;
    var re = /^(0|[1-9][0-9]{0,2}(\.[0-9]{0,3})?)$/;
    if (re.test(e.target.value) || e.target.value === '') {
      if (this.state.evaluating) {
        this.setState({ time: e.target.value })
      }
    }
  }
  handlePieces(e) {
    // const re = /^[0-9]{1,3}(\.[0-9]{1,3})?$/;
    var re = /^(0|[1-9][0-9]{0,2})$/;
    if (re.test(e.target.value) || e.target.value === '') {
      if (this.state.evaluating) {
        this.setState({ piece: e.target.value })
      }
    }
  }
  renderButton1() {
    return (
      <button className="game-button" onClick={() => { this.submit() }}>Submit</button>
    )
  }
  renderButton2() {
    return (
      <button className="game-button" onClick={() => { this.clear() }}>Clear</button>
    )
  }
  renderTime() {
    return (
      <input value={this.state.time} onChange={(e) => { this.handleTime(e) }} />
    )
  }
  renderText() {
    let text;
    if (!this.state.evaluating) {
      text = "Submitted"
    }
    else {
      text = "Evaluating"
    }
    return (
      text
    )
  }
  percentageLogic(tetrisState) {
    let min = 21;
    let sum = 0;
    let emptyCol = 0;
    for (var i = 0; i < 10; i++) {
      let count = 0;
      for (var j = 0; j < 20; j++) {
        if (tetrisState[j][i] !== false) {
          count++;
        }
      }
      if (count < min) {
        min = count;
      }
      if (count === 0) {
        emptyCol++;
      }
      sum += count;
    }
    let maxSum = sum - min;
    let retInfo = [];
    retInfo.push(min); retInfo.push(maxSum); retInfo.push(maxSum / sum); retInfo.push(emptyCol);
    return retInfo;
  }

  searchHelper(row, col, searchArray, flag) {
    let numRows;
    if (flag) {
      numRows = 21;
    }
    else {
      numRows = 20;
    }
    if (row < 0 || col < 0 || row >= numRows || col >= 10 || searchArray[row][col] === false) {
      return false;
    }
    else {
      searchArray[row][col] = false;
      this.searchHelper(row + 1, col, searchArray, flag);
      this.searchHelper(row - 1, col, searchArray, flag);
      this.searchHelper(row, col + 1, searchArray, flag);
      this.searchHelper(row, col - 1, searchArray, flag);
      return true;
    }

  }

  isValid(tetrisState) {
    let bfsArray = tetrisState;
    let fullRow = Array(10).fill(true);
    bfsArray.push(fullRow)
    let count = 0;
    for (var i = 0; i < 21; i++) {
      for (var j = 0; j < 10; j++) {
        if (bfsArray[i][j] !== false) {
          if (this.searchHelper(i, j, bfsArray, true)) {
            count++;
          }
        }
      }
    }
    if (count > 1) {
      return false;
    }
    else {
      return true;
    }
  }

  fullRow(tetrisState) {
    for (var i = 0; i < 20; i++) {
      let flag = false;
      for (var j = 0; j < 10; j++) {
        if (tetrisState[i][j] === false) {
          flag = true;
        }
      }
      if (!flag) {
        return false;
      }
    }
    return true;
  }

  holes(tetrisState) {
    let holes = 0;
    let tempArray = tetrisState;
    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 10; j++) {
        if (tempArray[i][j] !== false) {
          tempArray[i][j] = false;
        }
        else {
          tempArray[i][j] = true;
        }
      }
    }
    for (var k = 0; k < 20; k++) {
      for (var l = 0; l < 10; l++) {
        if (tempArray[k][l] !== false) {
          if (this.searchHelper(k, l, tempArray, false)) {
            holes++;
          }
        }
      }
    }
    return holes - 1;
  }

  pieces(level) {
    let pieces;
    switch (level) {
      case 1:
        pieces = 11;
        break;
      case 2:
        pieces = 10;
        break;
      case 3:
        pieces = 14;
        break;
      case 4:
        pieces = 11;
        break;
      case 5:
        pieces = 17;
        break;
      case 6:
        pieces = 22;
        break;
      case 7:
        pieces = 12;
        break;
      case 8:
        pieces = 18;
        break;
      case 9:
        pieces = 25;
        break;
      case 10:
        pieces = 9;
        break;
      case 11:
        pieces = 14;
        break;
      case 12:
        pieces = 12;
        break;
      case 13:
        pieces = 12;
        break;
      case 14:
        pieces = 18;
        break;
      case 15:
        pieces = 41;
        break;
      default:
        pieces = this.state.piece;
    }
    return pieces;
  }

  score(percentage, emptyCol, holes, pps) {
    let score = (percentage * 100 - (Math.abs(emptyCol - 1) * 10) - (holes * 15)) * pps / 3;
    if (score >= 100) {
      return 100;
    }
    else if (score <= 0) {
      return 0;
    }
    else {
      return score;
    }
  }

  renderInfo() {
    let info = [];
    let array = this.state.squares;
    let retInfo = this.percentageLogic(array);
    let tempArray1 = [];
    for (var i = 0; i < array.length; i++)
      tempArray1[i] = array[i].slice();
    let tempArray2 = [];
    for (var j = 0; j < array.length; j++)
      tempArray2[j] = array[j].slice();
    let valid = this.isValid(tempArray1) && this.fullRow(array);
    let hole = this.holes(tempArray2);
    let pieces = this.pieces(this.state.level);
    let time = this.state.time;
    let pps = pieces / time;
    let score = this.score(retInfo[2], retInfo[3], hole, pps);
    if (!this.state.evaluating) {
      if (valid && time > 1) {
        // info.push(<ul>{"Valid: " + valid}</ul>);
        info.push(<ul key={0}>{"Min: " + retInfo[0]}</ul>);
        info.push(<ul key={1}>{"Max Sum: " + retInfo[1]}</ul>);
        info.push(<ul key={2}>{"Percentage: " + retInfo[2]}</ul>);
        info.push(<ul key={3}>{"Empty Columns: " + retInfo[3]}</ul>);
        info.push(<ul key={4}>{"Holes: " + hole.toString()}</ul>);
        info.push(<ul key={7}>{"Time: " + time.toString()}</ul>);
        info.push(<ul key={7}>{"PPS: " + pps.toFixed(5).toString()}</ul>);
        info.push(<b><ul key={5} style={{ fontSize: "20px" }}>{"Score: " + score.toFixed(5).toString()}</ul></b>);
      }
      else if (time <= 1) {
        info = <ul key={8}>{"Invalid Time"}</ul>;
      }
      else {
        info = <ul key={6}>{"Invalid Board State"}</ul>;
      }
    }
    else {
      info = ""
    }
    return (
      info
    )
  }
  renderVid() {
    let path;
    switch (this.state.level) {
      case 0:
        path = "";
        break;
      case 1:
        path = "https://jstris.jezevec10.com/replay/56618230";
        break;
      case 2:
        path = "https://jstris.jezevec10.com/replay/56617367";
        break;
      case 3:
        path = "https://jstris.jezevec10.com/replay/56617794";
        break;
      case 4:
        path = "https://jstris.jezevec10.com/replay/56670250";
        break;
      case 5:
        path = "https://jstris.jezevec10.com/replay/56670250";
        break;
      case 6:
        path = "https://jstris.jezevec10.com/replay/56670250";
        break;
      case 7:
        path = "https://jstris.jezevec10.com/replay/56690434";
        break;
      case 8:
        path = "https://jstris.jezevec10.com/replay/56690434";
        break;
      case 9:
        path = "https://jstris.jezevec10.com/replay/56690434";
        break;
      case 10:
        path = "https://jstris.jezevec10.com/replay/53088421";
        break;
      case 11:
        path = "https://jstris.jezevec10.com/replay/53088421";
        break;
      case 12:
        path = "https://jstris.jezevec10.com/replay/56670463";
        break;
      case 13:
        path = "https://jstris.jezevec10.com/replay/56617227";
        break;
      case 14:
        path = "https://jstris.jezevec10.com/replay/56617227";
        break;
      default:
        path = "https://jstris.jezevec10.com/replay/56617227";
    }
    if (this.state.reveal) {
      return (
        <div>
          {"Example: "}
          <a className={"hyperlink"} href={path} target={"_blank"} >
            {path}
          </a>
        </div>
      )
    }
    else {
      return ("")
    }
  }
  renderLevelInfo() {
    let text;
    let path;
    let lvspc;
    switch (this.state.level) {
      case 1:
        lvspc = "For the first level, let's take a look at the piece sequence given" +
          " to me at the beginning of my fastest 20L sprint (thus far). Aim to" +
          " leave a single empty column (for tetrises) and avoid creating holes." +
          " In the example, my placement is not pretty, but it satisfies the" +
          " basic principles above. This enables me to play on without getting" +
          " slowed down significantly.";
        break;
      case 2:
        lvspc = "An empty column and no holes are the bare minimum for a good position" +
          " but everyone has their personal preferences. For example," +
          " I prefer to put my well (empty column) on the right and like to" +
          " avoid \'mountains\' (a position that is tallest in the center)." +
          " Many others on the leaderboard leave a well in the 7th column to" +
          " employ a 6 -- 3 structure. Experiment to find a system that suits" +
          " you and view the example to see my preferred structure in action.";
        break;
      case 3:
        lvspc = "For the third level, let's take a look at a longer piece sequence." +
          " As you begin to stack higher, the \'balance\' of a position becomes" +
          " more important. A position is said to be \'balanced\' if each column" +
          " is at a similar height. This offers a lot of options for placing pieces" +
          " while waiting for an I-piece to fill the well. The example demonstrates" +
          " a very balanced position 14 pieces into a sprint run.";
        break;
      case 4:
        lvspc = "In the next few levels, we will practice stacking much higher." +
          " Let's start by stacking 11 pieces following the fundamentals from" +
          " earlier levels.";
        break;
      case 5:
        lvspc = "In this level, we will stack 17 pieces. Notice that the" +
          " piece sequence continues from the previous level. Use this" +
          " to your advantage as you increase your speed and try to find" +
          " a position that you are comfortable with."
        break;
      case 6:
        lvspc = "In this level, we will add 5 pieces from before to create a stack of 22 pieces. Take" +
          " note of the height of the stack in the example. In most sprint runs," +
          " a stack of this height should be maintained for the majority of the" +
          " run and only cleared towards the end." +
          " At this height, it is important for your stack to be fairly balanced.";
        break;
      case 7:
        lvspc = "In the following three levels, we will continue practicing" +
          " stacking higher using a different piece sequence.";
        break;
      case 8:
        lvspc = "In this level, we will add 6 pieces to continue building" +
          " the stack from level 7.";
        break;
      case 9:
        lvspc = "In this level, we will add 7 pieces to build a stack of" +
          " 25 pieces. The ability to consistently stack 20+ pieces cannot" +
          " be understated and is perhaps the most important ability to master" +
          " for Tetris beginners.";
        break;
      case 10:
        lvspc = "In this level, we will introduce a concept called skimming." +
          " In the example, my current position has no empty columns and" +
          " doesn't satisfy the stacking principles mentioned before. However," +
          " this is intentional. I am setting up the 5th row to be cleared" +
          " in the future which will return my stack to an ideal state."
        break;
      case 11:
        lvspc = "As we add a few pieces to the sequence from the previous" +
          " level, we see an opportunity to clear the square covering the" +
          " otherwise empty well. In the example, this returns the score" +
          " of my position to 100 from only 75.8 in the previous level." +
          " Skimming is mainly used to balance a position or prevent topping-out.";
        break;
      case 12:
        lvspc = "In this level, we will demonstrate another way to set up" +
          " a position for skimming. In the example, I leave a 2-block wide" +
          " well that sets me up to skim a line with either an L-piece or a T-piece." +
          " The lesson here is to not be afraid of small 2-block or even 3-block wide" +
          " gaps on the top of a well.";
        break;
      case 13:
        lvspc = "The concepts from the previous levels are easy to employ" +
          " with perfect play. However, what happens if a misdrop occurs?" +
          " I like to believe that every position is savable in Tetris. Let's" +
          " introduce this scenario in the following few levels by starting" +
          " with a familiar 12-piece sequence that employs a little skimming."
        break;
      case 14:
        lvspc = "Going forward a few pieces, I misdrop an O-piece one square" +
          " to the right making it hard to the 8th row (as it is covered). Slow" +
          " down the provided replay to see how I save my position by skimming" +
          " twice before practicing yourself!"
        break;
      case 15:
        lvspc = "Let's combine the scenarios from the last two levels." +
          " Follow along with the replay to practice saving a misdrop in the" +
          " middle of a run or practice the concepts in all of the levels" +
          " with a 41-piece sequence."
        break;
      default: lvspc = "";
    }
    if (this.state.level === 0) {
      text = "Welcome to Trainstris!" + '\n' + '\n' +
        "For Tetris beginners trying to improve their game, Trainstris offers" +
        " a series of carefully curated levels designed to teach players how to" +
        " stack quicker and evaluate their board state. With our many in-game" +
        " scenarios and revolutionary scoring methodology, Trainstris" +
        " gives meaning to mindless practice and will hopefully" +
        " help you achieve your PPS (Pieces Per Second) aspirations!" + '\n' + '\n' +
        "Good luck and get stacking!";
    }
    else if (this.state.level === 16) {
      text = "Sandbox Mode:" + '\n' + '\n' +
        "If you haven't completed all 15 levels yet, it is recommended that you do that first." +
        " Otherwise, congratulations on completing all of the levels. For" +
        " further practice, click on the link below to access 20L tetris sprints." +
        " Input the number of pieces placed and your time to evaluate your position." + '\n' + '\n' +
        "Thanks for playing and hopefully you were able to learn something!"
    }
    else {
      text = "Welcome to level " + this.state.level + '\n' + '\n' + lvspc + '\n' + '\n' +
        "Directions: Click on the map linked below and try to" +
        " place all of the blocks provided as quickly as possible" +
        " aiming for an even structure and a single well. " +
        " Once you are finished, replicate your position on the board" +
        " to the right, enter your time (in seconds), and submit to evaluate your piece arrangement and see your score." +
        " Click reveal to see my placement and the same opening" +
        " in an actual sprint round.";
    }
    switch (this.state.level) {
      case 0:
        path = "";
        break;
      case 1:
        path = "https://jstris.jezevec10.com/?play=6&map=67421";
        break;
      case 2:
        path = "https://jstris.jezevec10.com/?play=6&map=67530";
        break;
      case 3:
        path = "https://jstris.jezevec10.com/?play=6&map=67947";
        break;
      case 4:
        path = "https://jstris.jezevec10.com/?play=6&map=67527";
        break;
      case 5:
        path = "https://jstris.jezevec10.com/?play=6&map=67528";
        break;
      case 6:
        path = "https://jstris.jezevec10.com/?play=6&map=67529";
        break;
      case 7:
        path = "https://jstris.jezevec10.com/?play=6&map=67531";
        break;
      case 8:
        path = "https://jstris.jezevec10.com/?play=6&map=67532";
        break;
      case 9:
        path = "https://jstris.jezevec10.com/?play=6&map=67821";
        break;
      case 10:
        path = "https://jstris.jezevec10.com/?play=6&map=67951";
        break;
      case 11:
        path = "https://jstris.jezevec10.com/?play=6&map=67952";
        break;
      case 12:
        path = "https://jstris.jezevec10.com/?play=6&map=67953";
        break;
      case 13:
        path = "https://jstris.jezevec10.com/?play=6&map=67954";
        break;
      case 14:
        path = "https://jstris.jezevec10.com/?play=6&map=68032";
        break;
      case 15:
        path = "https://jstris.jezevec10.com/?play=6&map=67955";
        break;
      default:
        path = "https://jstris.jezevec10.com/play/sprint/20";
    }
    return (
      <div className="level-info"> {text}
        <br />
        <br />
        <a className="hyperlink" href={path} target={"_blank"} >
          {path}
        </a>
        <br />
        <br />
        {this.renderVid()}
      </div >

    )
  }
  renderImage() {
    if (this.state.reveal) {
      let imgSource;
      switch (this.state.level) {
        case 0:
          imgSource = "";
          break;
        case 1:
          imgSource = <img src={require('../images/sol1.png')} style={{ width: '275px' }
          } />;
          break;
        case 2:
          imgSource = <img src={require('../images/sol2.png')} style={{ width: '275px' }
          } />;
          break;
        case 3:
          imgSource = <img src={require('../images/sol3.png')} style={{ width: '275px' }
          } />;
          break;
        case 4:
          imgSource = <img src={require('../images/sol4.png')} style={{ width: '275px' }
          } />;
          break;
        case 5:
          imgSource = <img src={require('../images/sol5.png')} style={{ width: '275px' }
          } />;
          break;
        case 6:
          imgSource = <img src={require('../images/sol6.png')} style={{ width: '275px' }
          } />;
          break;
        case 7:
          imgSource = <img src={require('../images/sol7.png')} style={{ width: '275px' }
          } />;
          break;
        case 8:
          imgSource = <img src={require('../images/sol8.png')} style={{ width: '275px' }
          } />;
          break;
        case 9:
          imgSource = <img src={require('../images/sol9.png')} style={{ width: '275px' }
          } />;
          break;
        case 10:
          imgSource = <img src={require('../images/sol10.png')} style={{ width: '275px' }
          } />;
          break;
        case 11:
          imgSource = <img src={require('../images/sol11.png')} style={{ width: '275px' }
          } />;
          break;
        case 12:
          imgSource = <img src={require('../images/sol12.png')} style={{ width: '275px' }
          } />;
          break;
        case 13:
          imgSource = <img src={require('../images/sol13.png')} style={{ width: '275px' }
          } />;
          break;
        case 14:
          imgSource = <img src={require('../images/sol14.png')} style={{ width: '275px' }
          } />;
          break;
        default:
          imgSource = <img src={require('../images/sol14.png')} style={{ width: '275px' }
          } />;
      }
      return (
        imgSource
      )
    }
    else {
      return ("")
    }
  }
  renderLevelSol() {
    if (this.state.level !== 0) {
      if (this.state.level !== 16) {
        return (
          <div className="level-sol">
            <button className="game-button" onClick={() => { this.reveal() }}> Reveal </button>
            <br />
            {this.renderImage()}
          </div>
        )
      }
      else {
        return (
          <div className="level-sol"> {"Input number of pieces placed:"}
            <br />
            <br />
            <input value={this.state.piece} onChange={(e) => { this.handlePieces(e) }} />
          </div>
        )
      }
    }
    else {
      return (
        <div className="level-sol"> {"Recommended Settings:"}
          <br />
          <br />
          <img src={require('../images/Settings.png')} style={{ width: '275px' }
          } />;
        </div>
      )
    }

  }
  renderGame() {
    if (this.state.level !== 0) {
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={this.state.squares} onClick={(i, j) => this.handleClick(i, j)} />
          </div>
          <div className="game-info">
            <div id="a"> {this.renderText()} </div>
            {"Time: "}
            {this.renderTime()}
            <br />
            {this.renderButton1()}
            {this.renderButton2()}
            <ol>{this.renderInfo()}</ol>
          </div>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="levels">
        <LevelSelect level={this.state.level} onClick={(i) => this.handleLevelClick(i)} />
        {this.renderLevelInfo()}
        {this.renderLevelSol()}
        {this.renderGame()}
      </div>
    );
  }
}

export default Game;
