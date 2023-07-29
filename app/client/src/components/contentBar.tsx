import React from "react";
import { useState, useEffect } from "react";
import "../scss/contentBar.scss"

export default function ContentBar({content}) {
    return (
        <div className="contentBar">{content}</div>
    )
}