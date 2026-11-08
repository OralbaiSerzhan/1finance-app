
import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  Switch, Modal, StyleSheet, StatusBar,
} from 'react-native';

const GREEN = '#00D09E';
const DARK = '#052224';
const LIGHT = '#F1FFF3';
const FIELD = '#DFF7E2';

type S = 'profile' | 'settings' | 'notif' | 'password' | 'passDone' | 'delete' | 'help' | 'support' | 'chat';

/* ---------- small helpers ---------- */

function Btn({ text, onPress, filled = true }: { text: string; onPress: () => void; filled?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} style={[s.btn, { backgroundColor: filled ? GREEN : FIELD }]}>
      <Text style={s.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

function Field(p: { label: string; value: string; onChange: (t: string) => void; password?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <View style={{ width: '100%', marginBottom: 14 }}>
      <Text style={s.label}>{p.label}</Text>
      <View style={s.inputWrap}>
        <TextInput
          style={s.input}
          value={p.value}
          onChangeText={p.onChange}
          secureTextEntry={p.password && !show}
          placeholder="••••••••"
          placeholderTextColor="#05222466"
        />
        {p.password && (
          <TouchableOpacity onPress={() => setShow(!show)}>
            <Text style={{ fontSize: 18 }}>{show ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function Row({ icon, text, onPress }: { icon: string; text: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={s.row}>
      <View style={s.rowIcon}><Text style={{ fontSize: 18 }}>{icon}</Text></View>
      <Text style={s.rowText}>{text}</Text>
      <Text style={{ color: DARK, fontSize: 18 }}>›</Text>
    </TouchableOpacity>
  );
}

function Popup({ visible, title, text, yes, onYes, onCancel }: {
  visible: boolean; title: string; text: string; yes: string; onYes: () => void; onCancel: () => void;
}) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={s.overlay}>
        <View style={s.popup}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: DARK, marginBottom: 8 }}>{title}</Text>
          <Text style={{ fontSize: 13, color: DARK, textAlign: 'center', marginBottom: 16 }}>{text}</Text>
          <Btn text={yes} onPress={onYes} />
          <Btn text="Cancel" filled={false} onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
}

/* ---------- main component ---------- */

export default function MoreApp({ onLogout }: { onLogout: () => void }) {
  const [stack, setStack] = useState<S[]>(['profile']);
  const cur = stack[stack.length - 1];
  const go = (x: S) => setStack((st) => [...st, x]);
  const back = () => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st));

  const [logoutPopup, setLogoutPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  const titles: Record<S, string> = {
    profile: 'Profile', settings: 'Settings', notif: 'Notification Settings',
    password: 'Password Settings', passDone: '', delete: 'Delete Account',
    help: 'Help & FAQs', support: 'Online Support', chat: 'Online Support',
  };

  if (cur === 'passDone') {
    return <PassDone onDone={() => setStack(['profile', 'settings'])} />;
  }

  return (
    <View style={s.green}>
      <View style={s.header}>
        {cur !== 'profile' && (
          <TouchableOpacity onPress={back} style={s.backBtn}>
            <Text style={{ fontSize: 24, color: DARK }}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={s.headerTitle}>{titles[cur]}</Text>
      </View>

      <View style={s.card}>
        {cur === 'profile' && <Profile go={go} onLogout={() => setLogoutPopup(true)} />}
        {cur === 'settings' && <Settings go={go} />}
        {cur === 'notif' && <Notif />}
        {cur === 'password' && <PasswordSettings onChanged={() => go('passDone')} />}
        {cur === 'delete' && <DeleteAccount onDelete={() => setDeletePopup(true)} />}
        {cur === 'help' && <Help go={go} />}
        {cur === 'support' && <Support go={go} />}
        {cur === 'chat' && <Chat />}
      </View>

      {/* bottom bar */}
      <View style={s.bottom}>
        {['🏠', '🔍', '🔄', '📊', '👤'].map((ic, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => i === 4 && setStack(['profile'])}
            style={[s.tab, i === 4 && { backgroundColor: GREEN }]}
          >
            <Text style={{ fontSize: 18 }}>{ic}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Popup
        visible={logoutPopup}
        title="End Session"
        text="Are you sure you want to log out?"
        yes="Yes, End Session"
        onYes={() => { setLogoutPopup(false); onLogout(); }}
        onCancel={() => setLogoutPopup(false)}
      />
      <Popup
        visible={deletePopup}
        title="Delete Account"
        text={'Are you sure you want to log out?\nBy deleting your account, you agree that you understand the consequences of this action and that your data will be permanently removed.'}
        yes="Yes, Delete Account"
        onYes={() => { setDeletePopup(false); onLogout(); }}
        onCancel={() => setDeletePopup(false)}
      />
    </View>
  );
}

/* ---------- screens ---------- */

function Profile({ go, onLogout }: { go: (x: S) => void; onLogout: () => void }) {
  return (
    <ScrollView contentContainerStyle={s.content}>
      <View style={s.avatar}><Text style={{ fontSize: 44 }}>🧑</Text></View>
      <Text style={{ fontSize: 20, fontWeight: '700', color: DARK, marginTop: 8 }}>John Smith</Text>
      <Text style={{ color: DARK, fontSize: 12, marginBottom: 24 }}>ID: 25030024</Text>
      <Row icon="👤" text="Edit Profile" onPress={() => {}} />
      <Row icon="🔐" text="Security" onPress={() => {}} />
      <Row icon="⚙️" text="Setting" onPress={() => go('settings')} />
      <Row icon="❓" text="Help" onPress={() => go('help')} />
      <Row icon="🚪" text="Logout" onPress={onLogout} />
    </ScrollView>
  );
}

function Settings({ go }: { go: (x: S) => void }) {
  return (
    <ScrollView contentContainerStyle={s.content}>
      <Row icon="🔔" text="Notification Settings" onPress={() => go('notif')} />
      <Row icon="🔑" text="Password Settings" onPress={() => go('password')} />
      <Row icon="🗑" text="Delete Account" onPress={() => go('delete')} />
    </ScrollView>
  );
}

function Notif() {
  const names = [
    'General Notification', 'Sound', 'Sound Call', 'Vibrate', 'Transaction Update',
    'Expense Reminder', 'Budget Notifications', 'Low Balance Alerts',
  ];
  const [on, setOn] = useState<boolean[]>(names.map((_, i) => i < 5));
  return (
    <ScrollView contentContainerStyle={s.content}>
      {names.map((n, i) => (
        <View key={n} style={s.switchRow}>
          <Text style={{ color: DARK, fontSize: 15 }}>{n}</Text>
          <Switch
            value={on[i]}
            onValueChange={(v) => setOn(on.map((x, k) => (k === i ? v : x)))}
            trackColor={{ true: GREEN, false: FIELD }}
            thumbColor="#fff"
          />
        </View>
      ))}
    </ScrollView>
  );
}

function PasswordSettings({ onChanged }: { onChanged: () => void }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  return (
    <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <Field label="Current Password" value={a} onChange={setA} password />
      <Field label="New Password" value={b} onChange={setB} password />
      <Field label="Confirm New Password" value={c} onChange={setC} password />
      <View style={{ height: 20 }} />
      <Btn text="Change Password" onPress={onChanged} />
    </ScrollView>
  );
}

function PassDone({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={[s.green, { alignItems: 'center', justifyContent: 'center' }]}>
      <View style={s.circle}><Text style={{ fontSize: 40, color: LIGHT }}>✓</Text></View>
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: '500', color: DARK, textAlign: 'center' }}>
        Password Has Been{'\n'}Changed Successfully
      </Text>
    </View>
  );
}

function DeleteAccount({ onDelete }: { onDelete: () => void }) {
  const [pw, setPw] = useState('');
  return (
    <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
      <Text style={{ fontWeight: '700', color: DARK, fontSize: 16, marginBottom: 10 }}>
        Are You Sure You Want To Delete Your Account?
      </Text>
      <View style={s.note}>
        <Text style={{ color: DARK, fontSize: 12, lineHeight: 18 }}>
          This action will permanently delete all of your data, and you will not be able to recover it. Please keep the following in mind before proceeding:{'\n\n'}
          • All your expenses, income and associated transactions will be eliminated.{'\n'}
          • You will not be able to access your account.{'\n'}
          • This action cannot be undone.
        </Text>
      </View>
      <Field label="Please Enter Your Password To Confirm Deletion Of Your Account" value={pw} onChange={setPw} password />
      <View style={{ height: 10 }} />
      <Btn text="Yes, Delete Account" onPress={onDelete} />
    </ScrollView>
  );
}

const FAQ = [
  'How do I add a transaction?', 'How do I set a budget?', 'How can I change my currency?',
  'How do I reset my password?', 'Can I export my data?', 'How do I delete my account?',
];
const CONTACTS = [
  ['☎️', 'Customer Service'], ['🌐', 'Website'], ['📘', 'Facebook'], ['💬', 'WhatsApp'], ['📸', 'Instagram'],
];

function Help({ go }: { go: (x: S) => void }) {
  const [tab, setTab] = useState<'faq' | 'contact'>('faq');
  const [open, setOpen] = useState<number | null>(null);
  return (
    <ScrollView contentContainerStyle={s.content}>
      <Text style={{ fontWeight: '700', color: DARK, marginBottom: 12 }}>How Can We Help You?</Text>
      <View style={s.tabs}>
        {(['faq', 'contact'] as const).map((t) => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[s.tabBtn, tab === t && { backgroundColor: GREEN }]}>
            <Text style={{ color: DARK, fontWeight: '600' }}>{t === 'faq' ? 'FAQ' : 'Contact Us'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === 'faq' ? (
        FAQ.map((q, i) => (
          <TouchableOpacity key={q} onPress={() => setOpen(open === i ? null : i)} style={s.faq}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: DARK, fontWeight: '500', flex: 1 }}>{q}</Text>
              <Text style={{ color: DARK }}>{open === i ? '⌃' : '⌄'}</Text>
            </View>
            {open === i && (
              <Text style={{ color: DARK, fontSize: 12, marginTop: 8 }}>
                Open the app menu and follow the steps in the corresponding section. Contact support if you need more help.
              </Text>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <>
          {CONTACTS.map(([ic, n]) => (
            <Row key={n} icon={ic} text={n} onPress={() => {}} />
          ))}
          <View style={{ height: 16 }} />
          <Btn text="Online Support" onPress={() => go('support')} />
        </>
      )}
    </ScrollView>
  );
}

function Support({ go }: { go: (x: S) => void }) {
  const chat = (name: string, msg: string) => (
    <TouchableOpacity key={name + msg} onPress={() => go('chat')} style={s.chatItem}>
      <View style={s.chatAvatar}><Text>🎧</Text></View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: DARK, fontWeight: '600' }}>{name}</Text>
        <Text style={{ color: DARK, fontSize: 12 }} numberOfLines={1}>{msg}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ScrollView contentContainerStyle={s.content}>
      <Text style={s.section}>Active Chats</Text>
      {chat('Support Assistant', 'Hello, how can I help you today?')}
      <Text style={[s.section, { marginTop: 16 }]}>Ended Chats</Text>
      {chat('Help Center', 'Your issue has been resolved.')}
      {chat('Support Assistant', 'Thank you for contacting us.')}
      {chat('Help Center', 'Have a nice day!')}
      <View style={{ height: 16 }} />
      <Btn text="Start A New Chat" onPress={() => go('chat')} />
    </ScrollView>
  );
}

function Chat() {
  const [msgs, setMsgs] = useState([
    { me: false, t: 'Hello! How can I help you today?' },
    { me: true, t: 'Hi, I have a question about my budget.' },
    { me: false, t: 'Sure, please tell me more.' },
  ]);
  const [text, setText] = useState('');
  const send = () => {
    if (!text.trim()) return;
    setMsgs([...msgs, { me: true, t: text.trim() }]);
    setText('');
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {msgs.map((m, i) => (
          <View key={i} style={[s.bubble, m.me ? s.bubbleMe : s.bubbleOther]}>
            <Text style={{ color: DARK }}>{m.t}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={s.chatInput}>
        <TextInput
          style={[s.input, { backgroundColor: FIELD, borderRadius: 20, paddingHorizontal: 14 }]}
          value={text}
          onChangeText={setText}
          placeholder="Write a message..."
          placeholderTextColor="#05222466"
        />
        <TouchableOpacity onPress={send} style={s.sendBtn}><Text style={{ fontSize: 18 }}>➤</Text></TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------- styles ---------- */

const s = StyleSheet.create({
  green: { flex: 1, backgroundColor: GREEN, paddingTop: StatusBar.currentHeight ?? 40 },
  header: { height: 90, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: DARK },
  backBtn: { position: 'absolute', left: 16 },
  card: { flex: 1, backgroundColor: LIGHT, borderTopLeftRadius: 48, borderTopRightRadius: 48, overflow: 'hidden' },
  content: { padding: 28, alignItems: 'center' },
  bottom: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: LIGHT, paddingVertical: 10 },
  tab: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  btn: { width: '70%', height: 46, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginVertical: 6 },
  btnText: { fontSize: 16, fontWeight: '600', color: DARK },
  label: { color: DARK, fontWeight: '500', fontSize: 14, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: FIELD, borderRadius: 16, paddingHorizontal: 14 },
  input: { flex: 1, height: 46, color: DARK },
  row: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingVertical: 12 },
  rowIcon: { width: 40, height: 40, borderRadius: 14, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  rowText: { flex: 1, color: DARK, fontSize: 16, fontWeight: '500' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: 10 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: FIELD, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: GREEN },
  circle: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: LIGHT, alignItems: 'center', justifyContent: 'center' },
  note: { backgroundColor: FIELD, borderRadius: 14, padding: 14, marginBottom: 16, width: '100%' },
  tabs: { flexDirection: 'row', backgroundColor: FIELD, borderRadius: 20, padding: 4, width: '100%', marginBottom: 14 },
  tabBtn: { flex: 1, paddingVertical: 10, borderRadius: 16, alignItems: 'center' },
  faq: { width: '100%', backgroundColor: FIELD, borderRadius: 14, padding: 14, marginBottom: 8 },
  section: { alignSelf: 'flex-start', fontWeight: '700', color: DARK, marginBottom: 8 },
  chatItem: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: FIELD, borderRadius: 14, padding: 12, marginBottom: 8 },
  chatAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 16, marginBottom: 8 },
  bubbleMe: { alignSelf: 'flex-end', backgroundColor: GREEN },
  bubbleOther: { alignSelf: 'flex-start', backgroundColor: FIELD },
  chatInput: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: GREEN, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  overlay: { flex: 1, backgroundColor: '#000000AA', alignItems: 'center', justifyContent: 'center', padding: 24 },
  popup: { width: '100%', backgroundColor: '#fff', borderRadius: 24, padding: 24, alignItems: 'center' },
});
