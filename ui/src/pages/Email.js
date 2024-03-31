import React from 'react';

// Sample emails data
const emails = [
    { id: 1, sender: 'john.doe@example.com', subject: 'Meeting Update', date: '2023-04-01', snippet: 'The meeting has been rescheduled to next week.' },
    { id: 2, sender: 'marketing@example.com', subject: 'Spring Sale Starts Now!', date: '2023-04-03', snippet: 'Our biggest sale of the season starts today. Don’t miss out!' },
    { id: 3, sender: 'no-reply@newsletter.com', subject: 'Your Weekly News Digest', date: '2023-04-05', snippet: 'This week’s top stories include...' },
    { id: 4, sender: 'friend@example.com', subject: 'Happy Birthday!', date: '2023-04-07', snippet: 'Wishing you all the best on your special day 🎉' },
];

function Email() {
    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Inbox</h2>
            <div className="space-y-4">
                {emails.map((email) => (
                    <div key={email.id} className="bg-white shadow overflow-hidden rounded-md p-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-semibold text-gray-800">{email.subject}</h3>
                            <span className="text-sm text-gray-500">{email.date}</span>
                        </div>
                        <p className="text-gray-600"><span className="font-medium text-gray-800">From:</span> {email.sender}</p>
                        <p className="text-gray-600 mt-2">{email.snippet}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Email;