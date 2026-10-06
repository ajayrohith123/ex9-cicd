import { useState } from "react";
import { Send, Image as ImageIcon, Smile, Paperclip, MoreVertical, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CONTACTS = [
  { id: 1, name: "Michael Chen", role: "Plumber", lastMessage: "I'll be there at 10 AM tomorrow.", time: "10:42 AM", unread: 2, online: true },
  { id: 2, name: "Sarah Jenkins", role: "Electrician", lastMessage: "Yes, I can fix that for you.", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Elena Rodriguez", role: "Painter", lastMessage: "Here is the quote for the living room.", time: "Oct 18", unread: 0, online: true },
];

const MESSAGES = [
  { id: 1, senderId: 1, text: "Hi, I received your booking request for tomorrow.", time: "10:30 AM" },
  { id: 2, senderId: "me", text: "Yes! Can you confirm if 10 AM works for you?", time: "10:35 AM" },
  { id: 3, senderId: 1, text: "I'll be there at 10 AM tomorrow.", time: "10:42 AM" },
];

export function Chat() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [showContacts, setShowContacts] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { 
      id: Date.now(), 
      senderId: "me", 
      text: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setMessage("");
  };

  const handleContactSelect = (contact: typeof CONTACTS[0]) => {
    setActiveContact(contact);
    setShowContacts(false);
  };

  const ContactsList = () => (
    <div className="flex-1 overflow-y-auto">
      {CONTACTS.map((contact) => (
        <div 
          key={contact.id} 
          onClick={() => handleContactSelect(contact)}
          className={`flex gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b last:border-0 ${activeContact.id === contact.id ? 'bg-muted' : ''}`}
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?u=${contact.id}`} />
              <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm truncate">{contact.name}</span>
              <span className="text-xs text-muted-foreground">{contact.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground truncate">{contact.lastMessage}</span>
              {contact.unread > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                  {contact.unread}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background overflow-hidden">
      {/* Sidebar — desktop always visible, mobile shown via toggle */}
      <div className={`
        border-r flex flex-col bg-card flex-shrink-0
        fixed inset-y-16 left-0 z-40 w-80 transition-transform duration-300
        md:relative md:inset-auto md:z-auto md:translate-x-0 md:flex
        ${showContacts ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-bold text-xl">Messages</h2>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowContacts(false)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
        <ContactsList />
      </div>

      {/* Mobile overlay */}
      {showContacts && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden" 
          onClick={() => setShowContacts(false)} 
        />
      )}

      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-full bg-background relative overflow-hidden">
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-4 sm:px-6 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Back to contacts on mobile */}
            <Button variant="ghost" size="icon" className="md:hidden mr-1" onClick={() => setShowContacts(true)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?u=${activeContact.id}`} />
              <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/provider/${activeContact.id}`} className="font-semibold hover:underline">
                {activeContact.name}
              </Link>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {activeContact.online ? (
                  <><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online</>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="text-center text-xs text-muted-foreground my-4">Today</div>
          {messages.map((msg) => {
            const isMe = msg.senderId === "me";
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${isMe ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 bg-card border-t flex-shrink-0">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                <ImageIcon className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 relative">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..." 
                className="pr-10 rounded-full h-11 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background"
              />
              <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground h-9 w-9 rounded-full">
                <Smile className="w-5 h-5" />
              </Button>
            </div>
            
            <Button type="submit" size="icon" className="h-11 w-11 rounded-full shrink-0" disabled={!message.trim()}>
              <Send className="w-5 h-5 ml-0.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}


const CONTACTS = [
  { id: 1, name: "Michael Chen", role: "Plumber", lastMessage: "I'll be there at 10 AM tomorrow.", time: "10:42 AM", unread: 2, online: true },
  { id: 2, name: "Sarah Jenkins", role: "Electrician", lastMessage: "Yes, I can fix that for you.", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Elena Rodriguez", role: "Painter", lastMessage: "Here is the quote for the living room.", time: "Oct 18", unread: 0, online: true },
];

const MESSAGES = [
  { id: 1, senderId: 1, text: "Hi, I received your booking request for tomorrow.", time: "10:30 AM" },
  { id: 2, senderId: "me", text: "Yes! Can you confirm if 10 AM works for you?", time: "10:35 AM" },
  { id: 3, senderId: 1, text: "I'll be there at 10 AM tomorrow.", time: "10:42 AM" },
];

export function Chat() {
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setMessages([...messages, { 
      id: Date.now(), 
      senderId: "me", 
      text: message, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Sidebar List */}
      <div className="w-full md:w-80 border-r flex flex-col bg-card hidden md:flex">
        <div className="p-4 border-b">
          <h2 className="font-bold text-xl">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {CONTACTS.map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setActiveContact(contact)}
              className={`flex gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b last:border-0 ${activeContact.id === contact.id ? 'bg-muted' : ''}`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${contact.id}`} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm truncate">{contact.name}</span>
                  <span className="text-xs text-muted-foreground">{contact.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground truncate">{contact.lastMessage}</span>
                  {contact.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4 text-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-full bg-background relative">
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-4 sm:px-6 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60 absolute top-0 w-full z-10">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={`https://i.pravatar.cc/150?u=${activeContact.id}`} />
              <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/provider/${activeContact.id}`} className="font-semibold hover:underline">
                {activeContact.name}
              </Link>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                {activeContact.online ? (
                  <><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online</>
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pt-20 pb-20 space-y-4">
          <div className="text-center text-xs text-muted-foreground my-4">Today</div>
          {messages.map((msg) => {
            const isMe = msg.senderId === "me";
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${isMe ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-muted text-foreground rounded-bl-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 bg-card border-t absolute bottom-0 w-full">
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <div className="flex gap-1">
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                <ImageIcon className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex-1 relative">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..." 
                className="pr-10 rounded-full h-11 bg-muted/50 border-transparent focus-visible:ring-primary focus-visible:bg-background"
              />
              <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground h-9 w-9 rounded-full">
                <Smile className="w-5 h-5" />
              </Button>
            </div>
            
            <Button type="submit" size="icon" className="h-11 w-11 rounded-full shrink-0" disabled={!message.trim()}>
              <Send className="w-5 h-5 ml-0.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
