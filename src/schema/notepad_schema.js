const graphql = require('graphql');
const Notepad = require('../models/notepad')
const Note = require('../models/note')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const NotepadType = new GraphQLObjectType({
    name: 'Notepad',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        color: {type: GraphQLString},
        background: {type: GraphQLString},
        notes: {
            type: GraphQLList(NoteType),
            resolve(parent,args){
                return Note.find({notepad: parent.id});
            }
        }
    })
});

const NoteType = new GraphQLObjectType({
    name: 'Note',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        color: {type: GraphQLString},
        text: {type: GraphQLString},
        notepad: {
            type: NotepadType,
            resolve(parent, args){
                return Notepad.findById(parent.notepad);
            }
        }
    })
});

const RootQuery =  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Notepad: {
            type: NotepadType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                return Notepad.findById(args.id);
            }
        },
        Note: {
            type: NoteType,
            args: {id: {type:GraphQLID}},
            resolve(parent, args){
                return Note.findById(args.id);
            }
        },
        notes: {
            type: GraphQLList(NoteType),
            resolve(parent, args){
                return Note.find({});
            }
        },
        notepads: {
            type: GraphQLList(NotepadType),
            resolve(parent, args){
                return Notepad.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addNotepad: {
            type: NotepadType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                color: {type: GraphQLString},
                background: {type: GraphQLString},
            },
            resolve(parent, args){
                let notepad = new Notepad({
                    name: args.name,
                    color: args.color,
                    background: args.background
                });
                return notepad.save();
            }
        },
        addNote: {
            type: NoteType,
            args: {
                title: {type: GraphQLNonNull(GraphQLString)},
                color: {type: GraphQLString},
                text: {type: GraphQLString},
                notepad: {type: GraphQLID}
            },
            resolve(parent, args){
                let note = new Note({
                    title: args.title,
                    color: args.color,
                    text: args.text,
                    notepad: args.notepad
                });
                return note.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})


