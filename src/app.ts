/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import * as MRE from '@microsoft/mixed-reality-extension-sdk';
// import { MreArgumentError } from '@microsoft/mixed-reality-extension-sdk';
/**
 * The main class of this app. All the logic goes here.
 */

//tt 
export default class HelloWorld {
	private button: MRE.Actor = null;
	private button1: MRE.Actor = null;
	private button2: MRE.Actor = null;
	private player: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	private buzzerSound: MRE.Sound = undefined;
	private buzzerSound1: MRE.Sound = undefined;
	private buzzerSound2: MRE.Sound = undefined;

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private async started() {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		// const menu = MRE.Actor.Create(this.context, {});

		// Load a glTF model before we use it
		const cubeData = await this.assets.loadGltf('Button.glb', "box");

		// spawn a copy of the glTF model
		this.button = MRE.Actor.CreateFromLibrary(this.context, {
			resourceId: "artifact:1856746880843645390",
			actor: {
				name: 'Altspace button',
				transform: {
					local: {
						position: { x: 0, y: -1, z: 0 },
						scale: { x: 0.4, y: 0.4, z: 0.4 }
					}
				}
			}
		});
		
		this.button1 = MRE.Actor.CreateFromLibrary(this.context, {
			resourceId: "artifact:1856746917543805402",
			actor: {
				name: 'Altspace button1',
				transform: {
					local: {
						position: { x: 1, y: -1, z: 0 },
						scale: { x: 0.4, y: 0.4, z: 0.4 }
					}
				}
			}
		});
		
		this.button2 = MRE.Actor.CreateFromLibrary(this.context, {
			resourceId: "artifact:1856746905615204822",
			actor: {
				name: 'Altspace button2',
				transform: {
					local: {
						position: { x: 2, y: -1, z: 0 },
						scale: { x: 0.4, y: 0.4, z: 0.4 }
					}
				}
			}
		});

		this.buzzerSound = this.assets.createSound(
			'wrong1',
			{ uri: 'https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1882339059980829529/ogg_buzzersound.ogg' });
		
		
		this.buzzerSound1 = this.assets.createSound(
			'buzz1',
			{ uri: 'https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1882338733085164039/ogg_dingg.ogg' });

		this.buzzerSound2 = this.assets.createSound(
			'buzz2',
			{ uri: 'https://cdn-content-ingress.altvr.com/uploads/audio_clip/audio/1924497660119614360/ogg_DJ_Airhorn_Sound_Effect.ogg' });
		
		// Set up cursor interaction. We add the sound
		// Button behaviors have two pairs of events: hover start/stop, and click start/stop.
		const buttonBehavior = this.button.setBehavior(MRE.ButtonBehavior);
		
		const buttonBehavior1 = this.button1.setBehavior(MRE.ButtonBehavior);

		const buttonBehavior2 = this.button2.setBehavior(MRE.ButtonBehavior);

		// Trigger the grow/shrink animations on hover.
		buttonBehavior.onHover('enter', () => {
			// use the convenience function "AnimateTo" instead of creating the animation data in advance
			MRE.Animation.AnimateTo(this.context, this.button, {
				destination: { transform: { local: { scale: { x: 0.6, y: 0.6, z: 0.6 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});
		
		buttonBehavior1.onHover('enter', () => {
			// use the convenience function "AnimateTo" instead of creating the animation data in advance
			MRE.Animation.AnimateTo(this.context, this.button1, {
				destination: { transform: { local: { scale: { x: 0.6, y: 0.6, z: 0.6 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});
		buttonBehavior.onHover('exit', () => {
			MRE.Animation.AnimateTo(this.context, this.button, {
				destination: { transform: { local: { scale: { x: 0.4, y: 0.4, z: 0.4 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});
		
		
		buttonBehavior1.onHover('exit', () => {
			MRE.Animation.AnimateTo(this.context, this.button1, {
				destination: { transform: { local: { scale: { x: 0.4, y: 0.4, z: 0.4 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});

		// When clicked, do a 360 sideways.
		buttonBehavior.onClick(_ => {
			
			this.startSound();
			
		});
		
		buttonBehavior1.onClick(_ => {
			
			this.startSound1();
			
		});

		buttonBehavior2.onClick(_ => {
			
			this.startSound2();
			
		});

	}
	private startSound = () => {
		const options: MRE.SetAudioStateOptions = { volume: 0.1 };
		options.time = 0;
		this.button.startSound(this.buzzerSound.id, options);
	}
	
	private startSound1 = () => {
		const options: MRE.SetAudioStateOptions = { volume: 0.7 };
		options.time = 0;
		this.button1.startSound(this.buzzerSound1.id, options);
	}
	
	private startSound2 = () => {
		const options: MRE.SetAudioStateOptions = { volume: 0.7 };
		options.time = 0;
		this.button2.startSound(this.buzzerSound2.id, options);
	}
}
