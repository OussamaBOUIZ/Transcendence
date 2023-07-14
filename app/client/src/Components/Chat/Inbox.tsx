import React from 'react'
import MessageOverview from './MessageOverview';


export default function Inbox () {
    const initState = false;

    return (
        <div>
            <section className="inbox">
                <nav>
                    <button className="active">Messages<span></span></button>
                    <button>Channels<span></span></button>
                </nav>
                {
                initState 
                &&
                    <aside>
                        <p>No DMs available Yet
                        Unlock a world of gaming
                        excitement, by creating 
                        or joining existing ones
                        </p>
                    </aside>
                }
                <MessageOverview />
            </section>
        </div>
    );
}