import { ReactNode, useEffect, useState } from 'react';
import { Card, useFirebase } from './hooks/useFirebase';

function FlexView({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const TextInput = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <FlexView>
      <p>{name}</p>
      <input
        placeholder={name}
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FlexView>
  );
};

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      style={{
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

function App() {
  const initCard: Card = {
    id: '',
    title: '',
    description: '',
    image: '',
    repeatLevel: 0,
    type: 'word',
  };
  const { getAll, add, remove, update } = useFirebase();
  const [cards, setCards] = useState<Card[]>([]);
  const [card, setCard] = useState<Card>(initCard);

  useEffect(() => {
    async function init() {
      const responseCards = await getAll();
      setCards(responseCards);
    }
    init();
  }, [getAll]);

  return (
    <FlexView style={{ flexDirection: 'row', gap: '20px' }}>
      <FlexView
        style={{
          flexGrow: 1,
          background: 'red',
        }}
      >
        <FlexView
          key={card.id}
          style={{
            background: 'white',
            flexDirection: 'row',
          }}
        >
          <FlexView
            style={{
              border: '1px solid black',
              width: '50px',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              wordBreak: 'break-all',
            }}
          >
            ID
          </FlexView>
          <FlexView
            style={{
              border: '1px solid black',
              width: '200px',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Title
          </FlexView>
          <FlexView
            style={{
              border: '1px solid black',
              flex: 1,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Description
          </FlexView>
          <FlexView
            style={{
              border: '1px solid black',
              padding: 10,
              width: '200px',
              overflow: 'hidden',
              wordBreak: 'break-all',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Image
          </FlexView>
          <FlexView
            style={{
              border: '1px solid black',
              width: '100px',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            RepeatLevel
          </FlexView>
          <FlexView
            style={{
              border: '1px solid black',
              width: '50px',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Type
          </FlexView>
          <FlexView
            style={{
              border: '1px solid black',
              width: '100px',
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            Actions
          </FlexView>
        </FlexView>
        {cards.map((card) => (
          <FlexView
            key={card.id}
            style={{
              background: 'white',
              flexDirection: 'row',
            }}
          >
            <FlexView
              style={{
                border: '1px solid black',
                width: '50px',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                wordBreak: 'break-all',
              }}
            >
              {card.id}
            </FlexView>
            <FlexView
              style={{
                border: '1px solid black',
                width: '200px',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {card.title}
            </FlexView>
            <FlexView
              style={{
                border: '1px solid black',
                flex: 1,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {card.description}
            </FlexView>
            <FlexView
              style={{
                border: '1px solid black',
                padding: 10,
                width: '200px',
                overflow: 'hidden',
                wordBreak: 'break-all',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {card.image}
            </FlexView>
            <FlexView
              style={{
                border: '1px solid black',
                width: '100px',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {card.repeatLevel}
            </FlexView>
            <FlexView
              style={{
                border: '1px solid black',
                width: '50px',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {card.type}
            </FlexView>
            <FlexView
              style={{
                border: '1px solid black',
                width: '100px',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Button onClick={async () => await update(card.id, card)}>
                Update
              </Button>
              <Button onClick={async () => await remove(card.id)}>
                Delete
              </Button>
            </FlexView>
          </FlexView>
        ))}
      </FlexView>
      <FlexView
        style={{
          gap: '20px',
          width: '300px',
          border: '1px solid black',
          borderRadius: 5,
          padding: '10px',
        }}
      >
        <p>Add Card</p>
        <TextInput
          name="Title"
          value={card.title}
          onChange={(value) => setCard({ ...card, title: value })}
        />
        <TextInput
          name="Description"
          value={card.description}
          onChange={(value) => setCard({ ...card, description: value })}
        />
        <Button
          onClick={async () => {
            if (card.title && card.description) {
              await add(card);
              setCard(initCard);
              await getAll();
            }
          }}
        >
          Add
        </Button>
      </FlexView>
    </FlexView>
  );
}

export default App;
