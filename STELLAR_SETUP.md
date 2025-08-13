# Configuración de Stellar para ReFinance

Este documento explica cómo configurar y usar el sistema de donaciones con Stellar XLM en ReFinance.

## 🚀 Características

- **Múltiples Wallets**: Soporte para Freighter, xBull y Albedo
- **Red Testnet**: Configurado para desarrollo y pruebas
- **Contratos Soroban**: Integración con contratos inteligentes de Stellar
- **Transacciones Transparentes**: Todas las donaciones se registran en la blockchain

## 📋 Requisitos Previos

1. **Node.js** (versión 16 o superior)
2. **npm** o **yarn**
3. **Extensiones de Wallet**:
   - [Freighter](https://www.freighter.app/) - Wallet oficial de Stellar
   - [xBull](https://xbull.app/) - Wallet avanzado para Stellar
   - [Albedo](https://albedo.link/) - Wallet basado en web

## ⚙️ Configuración

### 1. Instalación de Dependencias

```bash
npm install @stellar/stellar-sdk @stellar/freighter-api
```

### 2. Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Stellar Network Configuration
VITE_STELLAR_NETWORK=testnet
VITE_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# Contract Configuration
VITE_CONTRACT_ID=your_contract_id_here
VITE_TOKEN_ID=your_token_id_here
```

### 3. Configuración de Redes

- **Testnet**: Para desarrollo y pruebas (recomendado para desarrollo)
- **Mainnet**: Para producción (requiere configuración adicional)

## 🔧 Uso del Sistema

### Conectar Wallet

```jsx
import { useWallet } from '../hooks/useWallet';

const MyComponent = () => {
  const { connectWallet, wallets, activeWallet } = useWallet();
  
  const handleConnect = async (walletType) => {
    try {
      await connectWallet(walletType);
      console.log('Wallet conectado:', activeWallet);
    } catch (error) {
      console.error('Error al conectar:', error);
    }
  };
  
  return (
    <button onClick={() => handleConnect('freighter')}>
      Conectar Freighter
    </button>
  );
};
```

### Hacer una Donación

```jsx
import { useWallet } from '../hooks/useWallet';

const DonationComponent = () => {
  const { donate, activeWallet } = useWallet();
  
  const handleDonation = async (amount, campaignAddress) => {
    try {
      const result = await donate(activeWallet, campaignAddress, amount);
      console.log('Donación exitosa:', result.transactionHash);
    } catch (error) {
      console.error('Error en la donación:', error);
    }
  };
  
  return (
    <button onClick={() => handleDonation(10, 'campaign_address')}>
      Donar 10 XLM
    </button>
  );
};
```

## 🏗️ Estructura de Archivos

```
src/
├── actions/
│   └── makeDonations.js          # Funciones principales de donación
├── components/
│   ├── WalletConnector.jsx       # Componente de conexión de wallets
│   └── DonationForm.jsx          # Formulario de donación
├── hooks/
│   └── useWallet.js              # Hook personalizado para wallets
├── config/
│   └── stellar.js                # Configuración de Stellar
└── utils/
    └── stellarUtils.js           # Utilidades de Stellar
```

## 🔌 Integración con Contratos Soroban

El sistema está diseñado para trabajar con contratos inteligentes de Soroban. El contrato debe implementar la función `contribute`:

```rust
pub fn contribute(env: &Env, contributor: Address, campaign_address: Address, amount: i128) -> Result<(), Error>
```

### Parámetros del Contrato

- `contributor`: Dirección de la wallet del donante
- `campaign_address`: Dirección de la campaña
- `amount`: Cantidad a donar (en la unidad más pequeña del token)

## 🧪 Testing

### 1. Configurar Testnet

```bash
# Asegúrate de que VITE_STELLAR_NETWORK=testnet en tu .env
```

### 2. Obtener XLM de Testnet

```bash
# Usa el friendbot de Stellar para obtener XLM de prueba
curl "https://friendbot.stellar.org/?addr=TU_DIRECCION_AQUI"
```

### 3. Probar Transacciones

1. Conecta tu wallet (Freighter, xBull o Albedo)
2. Asegúrate de estar en la red testnet
3. Intenta hacer una donación pequeña
4. Verifica la transacción en [Stellar Explorer](https://testnet.stellarexplorer.io/)

## 🚨 Solución de Problemas

### Error: "Wallet not found"

- Asegúrate de que la extensión del wallet esté instalada
- Verifica que el wallet esté desbloqueado
- Intenta refrescar la página

### Error: "Insufficient balance"

- Verifica que tengas suficiente XLM en tu wallet
- En testnet, usa el friendbot para obtener XLM de prueba
- Asegúrate de tener XLM para pagar las fees de transacción

### Error: "Contract not found"

- Verifica que `VITE_CONTRACT_ID` esté configurado correctamente
- Asegúrate de que el contrato esté desplegado en la red correcta
- Verifica que el contrato implemente la función `contribute`

## 🔒 Seguridad

- **Nunca** compartas tus claves privadas
- **Siempre** usa testnet para desarrollo
- **Verifica** las direcciones de contrato antes de hacer transacciones
- **Mantén** actualizadas las dependencias de Stellar

## 📚 Recursos Adicionales

- [Documentación de Stellar](https://developers.stellar.org/)
- [Documentación de Soroban](https://soroban.stellar.org/)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Stellar Explorer](https://stellarexplorer.io/)

## 🤝 Contribuir

Para contribuir al desarrollo de esta integración:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Implementa los cambios
4. Añade tests si es necesario
5. Envía un pull request

## 📄 Licencia

Este proyecto está bajo la misma licencia que ReFinance. 