import React, { Component } from 'react';
function LoadingScreen() {
    return <div className="loading-screen">
        <h1 className="loading-screen__statement">Wczytywanie zawartości</h1>
        <div class="loading-screen__loader"></div>
    </div>;
}

export default LoadingScreen