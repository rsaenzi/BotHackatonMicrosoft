// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { CardFactory } = require('botbuilder');

// Import AdaptiveCard content.
const FlightItineraryCard = require('./resources/navidad.json');
const ImageGalleryCard = require('./resources/newyear.json');
const LargeWeatherCard = require('./resources/birthday.json');
const RestaurantCard = require('./resources/graduation.json');
const SolitaireCard = require('./resources/valentine.json');

// Create array of AdaptiveCard content, this will be used to send a random card to the user.
const CARDS = [
    FlightItineraryCard,
    ImageGalleryCard,
    LargeWeatherCard,
    RestaurantCard,
    SolitaireCard
];

/**
 * This array will have all the messages from the main conversation
 */
const mainConversation = [
    "Hello there! My name is Neko",
    "I love helping people to be happy!",
    "I love birthdays, christmas and all kind of celebrations!",
    "If you want, I can help you to create a awesome card!",
    ""
];

var mainIndex = 0;

/**
 * A bot that sends AdaptiveCards to the user when it receives a message.
 */
class AdaptiveCardsBot {
    /**
     * Every conversation turn for our AdaptiveCardsBot will call this method.
     * There are no dialogs used, since it's "single turn" processing, meaning a single
     * request and response, with no stateful conversation.
     * @param turnContext A TurnContext instance containing all the data needed for processing this conversation turn.
     */
    async onTurn(context) {

        context.sendActivity(mainConversation[mainIndex]);
        mainIndex++;
        

        
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (context.activity.type === 'message') {
            console.log(JSON.stringify(context.activity));
            const randomlySelectedCard = CARDS[1];
            await context.sendActivity({
                text: 'Here is an Adaptive Card:',
                attachments: [CardFactory.adaptiveCard(randomlySelectedCard)]
            });
        } else {
            await context.sendActivity(`[${ context.activity.type } event detected]`);
        }
        
    }
}

exports.AdaptiveCardsBot = AdaptiveCardsBot;
