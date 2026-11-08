import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, BackHandler,
} from 'react-native';

type Screen =
  | 'splash' | 'onboarding' | 'welcome' | 'login' | 'signup' | 'forgot'
  | 'pin' | 'newpass' | 'done' | 'fingerprint' | 'home';

const GREEN = '#00D09E';
const DARK = '#052224';
const LIGHT = '#F1FFF3';
const FIELD = '#DFF7E2';

/* ---------- reusable components ---------- */

function Btn({ text, onPress, filled = true }: { text: string; onPress: () => void; filled?: boolean }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[s.btn, { backgroundColor: filled ? GREEN : FIELD }]}
    >
      <Text style={s.btnText}>{text}</Text>
    </TouchableOpacity>
  );
}

function Link({ text, onPress }: { text: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 8 }}>
      <Text style={{ color: DARK }}>{text}</Text>
    </TouchableOpacity>
  );
}

function Field(props: {
  label: string; value: string; onChange: (t: string) => void;
  placeholder?: string; password?: boolean; keyboardType?: any;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={{ width: '100%', marginBottom: 14 }}>
      <Text style={s.label}>{props.label}</Text>
      <View style={s.inputWrap}>
        <TextInput
          style={s.input}
          value={props.value}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
          placeholderTextColor="#05222466"
          secureTextEntry={props.password && !visible}
          keyboardType={props.keyboardType}
          autoCapitalize="none"
        />
        {props.password && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Text style={{ fontSize: 18 }}>{visible ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function Scaffold({ title, onBack, children }: { title: string; onBack?: () => void; children: React.ReactNode }) {
  return (
    <View style={s.green}>
      <View style={s.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={s.backBtn}>
            <Text style={{ fontSize: 24, color: DARK }}>←</Text>
          </TouchableOpacity>
        )}
        <Text style={s.headerTitle}>{title}</Text>
      </View>
      <View style={s.card}>
        <ScrollView contentContainerStyle={s.cardContent} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

/* ---------- screens ---------- */

function Splash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={[s.green, s.center]}>
      <Text style={{ fontSize: 56 }}>📈</Text>
      <Text style={{ fontSize: 36, fontWeight: '700', color: LIGHT }}>FinWise</Text>
    </View>
  );
}

const PAGES = [
  { title: 'Welcome To\nExpense Manager', emoji: '💰' },
  { title: 'Are You Ready To\nTake Control Of\nYour Finance?', emoji: '📱' },
];

function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  return (
    <View style={s.green}>
      <View style={[s.center, { flex: 0.35 }]}>
        <Text style={s.onbTitle}>{PAGES[i].title}</Text>
      </View>
      <View style={[s.card, { flex: 0.65, alignItems: 'center', justifyContent: 'space-between', padding: 24 }]}>
        <View />
        <Text style={{ fontSize: 120 }}>{PAGES[i].emoji}</Text>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => (i < PAGES.length - 1 ? setI(i + 1) : onDone())} style={{ padding: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: DARK }}>Next</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginBottom: 16 }}>
            {PAGES.map((_, k) => (
              <View key={k} style={[s.dot, { backgroundColor: k === i ? GREEN : FIELD }]} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

function Welcome({ go }: { go: (s: Screen) => void }) {
  return (
    <View style={[s.light, s.center, { padding: 32 }]}>
      <Text style={{ fontSize: 56 }}>📈</Text>
      <Text style={{ fontSize: 36, fontWeight: '700', color: GREEN }}>FinWise</Text>
      <Text style={{ color: DARK, textAlign: 'center', marginVertical: 12 }}>
        Take control of your money,{'\n'}one step at a time.
      </Text>
      <View style={{ height: 20 }} />
      <Btn text="Log In" onPress={() => go('login')} />
      <Btn text="Sign Up" filled={false} onPress={() => go('signup')} />
      <Link text="Forgot Password?" onPress={() => go('forgot')} />
    </View>
  );
}

function Login({ go }: { go: (s: Screen) => void }) {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  return (
    <Scaffold title="Welcome">
      <Field label="Username Or Email" value={email} onChange={setEmail} placeholder="example@example.com" keyboardType="email-address" />
      <Field label="Password" value={pw} onChange={setPw} placeholder="••••••••" password />
      <View style={{ height: 12 }} />
      <Btn text="Log In" onPress={() => go('home')} />
      <Link text="Forgot Password?" onPress={() => go('forgot')} />
      <Btn text="Sign Up" filled={false} onPress={() => go('signup')} />
      <View style={{ height: 16 }} />
      <Text style={{ color: DARK, fontSize: 13 }}>Use Fingerprint To Access</Text>
      <Link text="🔒 Fingerprint" onPress={() => go('fingerprint')} />
    </Scaffold>
  );
}

function SignUp({ go, back }: { go: (s: Screen) => void; back: () => void }) {
  const [v, setV] = useState({ name: '', email: '', phone: '', dob: '', pw: '', pw2: '' });
  const set = (k: keyof typeof v) => (t: string) => setV({ ...v, [k]: t });
  return (
    <Scaffold title="Create Account" onBack={back}>
      <Field label="Full Name" value={v.name} onChange={set('name')} placeholder="John Doe" />
      <Field label="Email" value={v.email} onChange={set('email')} placeholder="example@example.com" keyboardType="email-address" />
      <Field label="Mobile Number" value={v.phone} onChange={set('phone')} placeholder="+7 000 000 00 00" keyboardType="phone-pad" />
      <Field label="Date Of Birth" value={v.dob} onChange={set('dob')} placeholder="DD / MM / YYYY" />
      <Field label="Password" value={v.pw} onChange={set('pw')} placeholder="••••••••" password />
      <Field label="Confirm Password" value={v.pw2} onChange={set('pw2')} placeholder="••••••••" password />
      <Text style={{ color: DARK, fontSize: 12, textAlign: 'center' }}>
        By continuing, you agree to{'\n'}Terms of Use and Privacy Policy.
      </Text>
      <View style={{ height: 12 }} />
      <Btn text="Sign Up" onPress={() => go('login')} />
      <Link text="Already have an account? Log In" onPress={() => go('login')} />
    </Scaffold>
  );
}

function Forgot({ go, back }: { go: (s: Screen) => void; back: () => void }) {
  const [email, setEmail] = useState('');
  return (
    <Scaffold title="Forgot Password" onBack={back}>
      <Text style={{ fontSize: 20, fontWeight: '600', color: DARK }}>Reset Password?</Text>
      <Text style={{ color: DARK, fontSize: 13, textAlign: 'center', marginVertical: 12 }}>
        Enter your email address and we will send you a code to reset your password.
      </Text>
      <View style={{ height: 12 }} />
      <Field label="Enter Email Address" value={email} onChange={setEmail} placeholder="example@example.com" keyboardType="email-address" />
      <View style={{ height: 12 }} />
      <Btn text="Next Step" onPress={() => go('pin')} />
      <Btn text="Sign Up" filled={false} onPress={() => go('signup')} />
    </Scaffold>
  );
}

function Pin({ go, back }: { go: (s: Screen) => void; back: () => void }) {
  const [pin, setPin] = useState('');
  const rows = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', '⌫']];
  const press = (k: string) => {
    if (k === '⌫') setPin(pin.slice(0, -1));
    else if (k && pin.length < 6) setPin(pin + k);
  };
  return (
    <Scaffold title="Security Pin" onBack={back}>
      <Text style={{ color: DARK, fontWeight: '600', marginBottom: 16 }}>Enter Security Pin</Text>
      <View style={{ flexDirection: 'row', marginBottom: 20 }}>
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <View key={k} style={[s.pinDot, { backgroundColor: k < pin.length ? GREEN : LIGHT }]} />
        ))}
      </View>
      {rows.map((r, ri) => (
        <View key={ri} style={{ flexDirection: 'row', marginVertical: 6 }}>
          {r.map((k, ki) => (
            <TouchableOpacity
              key={ki}
              disabled={!k}
              onPress={() => press(k)}
              style={[s.key, { backgroundColor: k ? FIELD : LIGHT }]}
            >
              <Text style={{ fontSize: 20, fontWeight: '500', color: DARK }}>{k}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      <View style={{ height: 16 }} />
      <Btn text="Accept" onPress={() => go('newpass')} />
      <Btn text="Send Again" filled={false} onPress={() => setPin('')} />
    </Scaffold>
  );
}

function NewPass({ go, back }: { go: (s: Screen) => void; back: () => void }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  return (
    <Scaffold title="New Password" onBack={back}>
      <Field label="New Password" value={a} onChange={setA} placeholder="••••••••" password />
      <Field label="Confirm New Password" value={b} onChange={setB} placeholder="••••••••" password />
      <View style={{ height: 24 }} />
      <Btn text="Change Password" onPress={() => go('done')} />
    </Scaffold>
  );
}

function Done({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, []);
  return (
    <View style={[s.green, s.center]}>
      <View style={s.circle}>
        <Text style={{ fontSize: 40, color: LIGHT }}>✓</Text>
      </View>
      <Text style={{ marginTop: 20, fontSize: 16, fontWeight: '500', color: DARK, textAlign: 'center' }}>
        Password Has Been{'\n'}Changed Successfully
      </Text>
    </View>
  );
}

function Fingerprint({ go, back }: { go: (s: Screen) => void; back: () => void }) {
  return (
    <Scaffold title="Security Fingerprint" onBack={back}>
      <View style={{ height: 24 }} />
      <TouchableOpacity onPress={() => go('home')} style={s.fpCircle}>
        <Text style={{ fontSize: 64 }}>☝</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 24, fontSize: 18, fontWeight: '600', color: DARK }}>Use Fingerprint To Access</Text>
      <Text style={{ marginVertical: 8, fontSize: 13, color: DARK, textAlign: 'center' }}>
        Touch the sensor to log in to your account.
      </Text>
      <View style={{ height: 24 }} />
      <Btn text="Use Touch Id" onPress={() => go('home')} />
      <Link text="Use Security Pin Instead" onPress={() => go('pin')} />
    </Scaffold>
  );
}

function Home() {
  return (
    <View style={[s.light, s.center]}>
      <Text style={{ fontSize: 20, color: DARK }}>Home — coming soon</Text>
    </View>
  );
}

/* ---------- app + simple navigation ---------- */

export default function App() {
  const [stack, setStack] = useState<Screen[]>(['splash']);
  const current = stack[stack.length - 1];

  const go = (sc: Screen) => setStack((st) => [...st, sc]);
  const reset = (sc: Screen) => setStack([sc]);
  const back = () => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st));

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) { back(); return true; }
      return false;
    });
    return () => sub.remove();
  }, [stack]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {current === 'splash' && <Splash onDone={() => reset('onboarding')} />}
      {current === 'onboarding' && <Onboarding onDone={() => reset('welcome')} />}
      {current === 'welcome' && <Welcome go={go} />}
      {current === 'login' && <Login go={go} />}
      {current === 'signup' && <SignUp go={go} back={back} />}
      {current === 'forgot' && <Forgot go={go} back={back} />}
      {current === 'pin' && <Pin go={go} back={back} />}
      {current === 'newpass' && <NewPass go={go} back={back} />}
      {current === 'done' && <Done onDone={() => reset('login')} />}
      {current === 'fingerprint' && <Fingerprint go={go} back={back} />}
      {current === 'home' && <Home />}
    </View>
  );
}

/* ---------- styles ---------- */

const s = StyleSheet.create({
  green: { flex: 1, backgroundColor: GREEN, paddingTop: (StatusBar.currentHeight ?? 40) },
  light: { flex: 1, backgroundColor: LIGHT },
  center: { alignItems: 'center', justifyContent: 'center' },
  header: { height: 100, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 22, fontWeight: '600', color: DARK },
  backBtn: { position: 'absolute', left: 16 },
  card: { flex: 1, backgroundColor: LIGHT, borderTopLeftRadius: 48, borderTopRightRadius: 48, overflow: 'hidden' },
  cardContent: { padding: 32, alignItems: 'center' },
  onbTitle: { fontSize: 24, fontWeight: '600', color: DARK, textAlign: 'center' },
  btn: { width: '70%', height: 46, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginVertical: 6 },
  btnText: { fontSize: 16, fontWeight: '600', color: DARK },
  label: { color: DARK, fontWeight: '500', fontSize: 15, marginBottom: 6 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: FIELD, borderRadius: 16, paddingHorizontal: 14 },
  input: { flex: 1, height: 48, color: DARK },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 3 },
  pinDot: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: GREEN, marginHorizontal: 5 },
  key: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 },
  circle: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: LIGHT, alignItems: 'center', justifyContent: 'center' },
  fpCircle: { width: 120, height: 120, borderRadius: 60, backgroundColor: FIELD, alignItems: 'center', justifyContent: 'center' },
});
