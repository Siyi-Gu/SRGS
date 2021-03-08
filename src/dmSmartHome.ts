import { MachineConfig, send, Action, assign } from "xstate";

// SRGS parser and example (logs the results to console on page load)
import { loadGrammar } from './runparser'
import { parse } from './chartparser'
import { grammar } from './grammars/intelligentGrammar'


const gram = loadGrammar(grammar)
//const input = "I would like a coca cola and three large pizzas with pepperoni and mushrooms"
//const prs = parse(input.split(/\s+/), gram)
//const result = prs.resultsForRule(gram.$root)[0]

//console.log(result)

function parsing(text:string): MachineConfig<SDSContext, any, SDSEvent> {
    return (parse(text.split(/\s+/), gram).resultsForRule(gram.$root)[0])
}

function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function promptAndAsk(prompt: string): MachineConfig<SDSContext, any, SDSEvent> {
    return ({
        initial: 'prompt',
        states: {
            prompt: {
                entry: say(prompt),
                on: { ENDSPEECH: 'ask' }
            },
            ask: {
                entry: send('LISTEN'),
            },
        }
    })
}


export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    states: {
        init: {
            on: {
                CLICK: 'welcome'
            }
        },
        welcome: {
            initial: "prompt",
            on: {
                RECOGNISED: {
                    cond: (context) => parsing(context.recResult) !== undefined,
                    target: 'confirm',
                    actions: assign((context) => { return { smarthome: parsing(context.recResult) } }),
                }
            },
            ...promptAndAsk("What can I do for you?")
        },
        confirm: {
            initial: 'prompt',
            on: { ENDSPEECH: "init" },
            states: {
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `OK. ${context.smarthome.action} ${context.smarthome.object}.`
                    }))
                },
            }
        }
    }
})
