# PIT_audio_visualizer
Website for an audio visualization tool for the RTU course "PIT" 2021

# Programmatūras apraksts
Lietotājs webā ievada audio failu (labākajā gadījumā mūziku) un redz tā vizualizāciju kamēr tas tiek atskaņots. Dizains - vairāku pasteļkrāsas viļņu plūšana gar ekrānu, kas katra reaģē uz izmaiņām savā frekvenču diapazonā.

# The tech stack
Runs on Node.js with Svelte framwork. p5.js lib for graphics rendering, p5.sound.js lib for loading in sound and analyzing, ccapture.js lib for exporting a rendering of the canvas as video.

# Running
from inside ./website/
install all node modules
`npm install`

You'll also need the files from ccapture.js repo - ccapture.all.min.js

Run svelte locally
`npm run dev`

Open browser on localhost:5000
Currently tested on Chrome Version 90.0.4430.93 (Official Build) (64-bit)
