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
	private text: MRE.Actor = null;
	private button: MRE.Actor = null;
	private player: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	private buzzerSound: MRE.Sound = undefined;
import { ActionState, BehaviorType, Guid, User } from '../..';

export interface ActionEvent {
	user: User;
	targetId: Guid;
	behaviorType: BehaviorType;
	actionName: string;
	actionState: ActionState;
	actionData?: any;

	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private async started() {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		const menu = MRE.Actor.Create(this.context, {});

		// Load a glTF model before we use it
		const cubeData = await this.assets.loadGltf('Button.glb', "box");

		// spawn a copy of the glTF model
		this.button = MRE.Actor.CreateFromLibrary(this.context, {
			// using the data we loaded earlier
			resourceId:"artifact:1956000461060309134",
			// Also apply the following generic actor properties.
			actor: {
				name: 'Altspace button',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				parentId: menu.id,
				transform: {
					local: {
						position: { x: 0, y: -1, z: 0 },
						scale: { x: 0.4, y: 0.4, z: 0.4 }
					}
				}
			}
		});

		this.buzzerSound = this.assets.createSound(
			'alarmSound',
			{ uri: 'Gameboy Startup Sound.wav' });


		// Set up cursor interaction. We add the input behavior ButtonBehavior to the button.
		// Button behaviors have two pairs of events: hover start/stop, and click start/stop.
		const buttonBehavior = this.button.setBehavior(MRE.ButtonBehavior);

		// Trigger the grow/shrink animations on hover.
		buttonBehavior.onHover('enter', () => {
			
		});
		buttonBehavior.onHover('exit', () => {
			MRE.Animation.AnimateTo(this.context, this.button, {
				destination: { transform: { local: { scale: { x: 0.4, y: 0.4, z: 0.4 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});

		// When clicked, do a 360 sideways.
		buttonBehavior.onClick(_ => {
			
			this.
			});MRE.Actor.CreateFromLibrary(this.context, {
			// using the data we loaded earlier
			resourceId:"artifact:2153444484094886470",
			// Also apply the following generic actor properties.
			actor: {
				name: 'Balloon Fall From Sky',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				parentId: menu.id,
				transform: {
					local: {
						position: { x: 0, y: -1, z: 0 },
						scale: { x: 0.4, y: 0.4, z: 0.4 }
		});

	}
	private startSound = () => {
		const options: MRE.SetAudioStateOptions = { volume: 0.4 };
		options.time = 0;
		this.button.startSound(this.buzzerSound.id, options);
	}

}
