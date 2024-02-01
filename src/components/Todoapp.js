import React from 'react';
import { getFirestore, collection, addDoc, getDocs, getDoc, updateDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from './firebase';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function Todoapp() {
    const [newTodo, setNewTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [description, setDescription] = useState('');
    const db = getFirestore(app);
    const user = getAuth(app).currentUser;

    function generateRandomId() {
        return uuidv4();
    }

    async function getTodos() {
        try {
            if (user) {
                const todoSnapshot = await getDocs(query(collection(db, "todos"), where("userId", "==", user.uid)));

                if (!todoSnapshot.empty) {
                    const todosData = todoSnapshot.docs.map(doc => ({ ...doc.data() }));
                    setTodos(todosData);
                } // else {
                  //  const firstTodos = await addTodoHelper(user.uid);
                  //  setTodos([firstTodos]);
               // }
            }
        } catch(e) {
            alert('Error getting todos: ' + e.message);
        }
    }

    useEffect(() => {
        getTodos();
    });

    async function addTodoHelper(userId) {
        try {
            return await addDoc(collection(db, "todos"), {
                userId: userId,
                id: generateRandomId(),
                todo: "your first todo",
                description: "description of your todo", 
                status: false,
            });
        } catch(e) {
            alert('Error adding todo: ' + e.message);
        }
    }

    async function addTodo() {
        if (newTodo.trim() === '') return;

        let docRef;

        try {
            if (user) {
                await addDoc(collection(db, "todos"), {
                    userId: user.uid,
                    docId: generateRandomId(),
                    todo: newTodo,
                    description,
                    status: false,
                });
            }
            setNewTodo('');
            setDescription('');
        } catch (e) {
            alert('Error adding todo: ' + e.message);
        }
    }

    async function deleteTodo(id) {
        try {
            const todoSnapshot = await getDocs(query(collection(db, "todos"), where("docId", "==", id)));

            if (!todoSnapshot.empty) {
                const docTodUpdate = todoSnapshot.docs[0].ref;
                await deleteDoc(docTodUpdate);
            }
        } catch(e) {
            alert('Error deleting todo: ' + e.message);
        }
    }

    async function completeTask(id) {
        try {
            const todoSnapshot = await getDocs(query(collection(db, "todos"), where("docId", "==", id)));

            if (!todoSnapshot.empty) {
                const docTodUpdate = todoSnapshot.docs[0].ref;
                await updateDoc(docTodUpdate, {
                status: false
            });
        }
        } catch(e) {
            alert('Error completing task: ' + e.message);
        }
    }

    async function inCompleteTask(id) {
        try {
            const todoSnapshot = await getDocs(query(collection(db, "todos"), where("docId", "==", id)));

            if (!todoSnapshot.empty) {
                const docTodUpdate = todoSnapshot.docs[0].ref;
                await updateDoc(docTodUpdate, {
                status: true
            });
        }
        } catch(e) {
            alert('Error completing task: ' + e.message);
        }
    }

  return (
    <div className='border-2 border-neutral-600 rounded w-full p-1'>
        <p className='text-base italic font-bold'>Enter todo</p>
      <input className='mr-4 active:border-solid w-4/5' type="text" id="todo" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <p className='text-base italic font-bold'>Enter todo description</p>
        <textarea className='w-full' name="todos" id="todos" cols="10" rows="10"
            value={description} onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={addTodo}
        className='bg-neutral-500 text-white rounded-md py-2 px-4 mb-2 hover:bg-white hover:text-neutral-500 ease-in duration-300'
      >
        Add todo
      </button>
      <ul className='w-full'>
        {todos.map((todo) => (
            <li key={todo.docId} className='w-full flex justify-between items-center text-bold mb-2'>
                <div>
                    <span className='font-bold text-lg mr-2'>
                        {todo.todo}:
                    </span>
                    
                    {todo.description}
                </div>
                <div>
                {
                    todo.status === true ? 
                        (<button className='bg-green-600 rounded-md' onClick={() => completeTask(todo.docId)}>Task Completed</button>)
                        :
                        (<button className='bg-red-600 rounded-md' onClick={() => inCompleteTask(todo.docId)}>Task Not Completed</button>)
                }
                <button className='bg-red-600 rounded-md ml-2' onClick={() => deleteTodo(todo.docId)}>Delete</button>
                </div>
            </li>
        ))}
      </ul>
    </div>
  )
}
