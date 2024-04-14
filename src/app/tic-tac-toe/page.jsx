"use client"
import { useState } from "react";
import Styles from "./tictactoe.module.css";

import React from "react"

export default function Tic() {
  const [hits, setHits] = useState([["", "", "", "", "", "", "", "", ""]]);
  const [showMove, setShowMove] = useState("X");

  function showMoves(index) {
    if (index % 2 === 0) setShowMove("X");

    if (index % 2 !== 0) setShowMove("O");
  }

  function addHits(hitToAdd) {
    setHits([...hits, [...hitToAdd]]);
  }

  function moves(index) {
    setHits(hits.filter((hit) => hits.indexOf(hit) < index + 1));

    showMoves(index);
  }

  return (
    <div className={Styles.main}>
      <h2 className={Styles.title}>Welcome to Tic-tac-toe!</h2>
      <Table
        newhit={addHits}
        hits={hits}
        showMove={showMove}
        showMoves={showMoves}
      />
      <History hits={hits} moves={moves} />
    </div>
  );
}

function History({ hits, moves }) {
  return (
    <>
      {hits.map((hit, index) => {
        if (index == 0) {
          return (
            <button key={hit} onClick={() => moves(index)}>
              reset
            </button>
          );
        } else {
          return (
            <button key={hit} onClick={() => moves(index)}>
              go to move {index}
            </button>
          );
        }
      })}
    </>
  );
}

function Table({ newhit, hits, showMoves, showMove }) {
  const [clickDisabled, setClickDisabled] = useState(false);

  let len = hits.length;
  let hit = [...hits[hits.length - 1]];

  function disableClick(trueFalse) {
    setClickDisabled(trueFalse);
  }

  function handleClick(index) {
    if (hit[index] === "") {
      showMoves(len);
      hit[index] = showMove;

      newhit(hit);
    }
  }

  return (
    <>
      <RenderTable
        hit={hit}
        handleClick={handleClick}
        clickDisabled={clickDisabled}
      />
      <Decision hit={hit} disableClick={disableClick} />
    </>
  );
}

function RenderTable({ hit, handleClick, clickDisabled }) {
  return (
    <>
      <table className={Styles.table}>
        <tr>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(0)}
          >
            {hit[0]}
          </td>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(1)}
          >
            {hit[1]}
          </td>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(2)}
          >
            {hit[2]}
          </td>
        </tr>

        <tr>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(3)}
          >
            {hit[3]}
          </td>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(4)}
          >
            {hit[4]}
          </td>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(5)}
          >
            {hit[5]}
          </td>
        </tr>

        <tr>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(6)}
          >
            {hit[6]}
          </td>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(7)}
          >
            {hit[7]}
          </td>
          <td
            className={Styles.td}
            onClick={clickDisabled ? () => {} : () => handleClick(8)}
          >
            {hit[8]}
          </td>
        </tr>
      </table>
    </>
  );
}

function Decision({ hit, disableClick }) {
  function decide(element) {
    return (
      (hit[0] == element && hit[1] == element && hit[2] == element) ||
      (hit[3] == element && hit[4] == element && hit[5] == element) ||
      (hit[6] == element && hit[7] == element && hit[8] == element) ||
      (hit[1] == element && hit[4] == element && hit[7] == element) ||
      (hit[2] == element && hit[5] == element && hit[8] == element) ||
      (hit[0] == element && hit[3] == element && hit[6] == element) ||
      (hit[0] == element && hit[4] == element && hit[8] == element) ||
      (hit[2] == element && hit[4] == element && hit[6] == element)
    );
  }

  if (decide("X")) {
    disableClick(true);

    return (
      <>
        <h2> X wins!</h2>
      </>
    );
  }

  if (decide("O")) {
    disableClick(true);

    return (
      <>
        <h2> O wins!</h2>
      </>
    );
  }

  disableClick(false);
}
