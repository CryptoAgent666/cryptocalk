import type { Lang, SpecCalculatorSlug } from './utils';

export const CALCULATOR_META: Record<Lang, Record<SpecCalculatorSlug, { title: string; description: string }>> = {
  'en': {
    'converter': {
      title: 'Crypto Converter | CryptoCalk',
      description: 'Free Crypto Converter. Convert Bitcoin, Ethereum, and 500+ cryptocurrencies to USD, EUR, and 10+ fiat currencies with real-time CoinGecko prices.'
    },
    'profit-calculator': {
      title: 'Crypto Profit Calculator | CryptoCalk',
      description: 'Free Crypto Profit Calculator. Enter buy and sell prices to see ROI, total fees, and net profit for 500+ cryptocurrencies. No signup required.'
    },
    'mining-calculator': {
      title: 'Bitcoin Mining Calculator | CryptoCalk',
      description: 'Free Bitcoin Mining Calculator. Enter hashrate, power consumption, and electricity cost to estimate daily, monthly, and yearly BTC mining revenue.'
    },
    'dca-calculator': {
      title: 'DCA Calculator | CryptoCalk',
      description: 'Free DCA Calculator for Bitcoin, Ethereum, and 500+ cryptocurrencies. Simulate dollar-cost averaging strategies with historical data and compare DCA vs lump sum.'
    },
    'tax-calculator': {
      title: 'Crypto Tax Calculator | CryptoCalk',
      description: 'Free Crypto Tax Calculator for 17 countries. Estimate capital gains tax, compare short vs long-term rates for the US, UK, Germany, Japan, and more.'
    },
    'what-if': {
      title: 'What If Calculator | CryptoCalk',
      description: 'Free What If Calculator. Backtest hypothetical crypto entries, evaluate opportunity cost, and compare alternative investment outcomes instantly.'
    },
    'position-size-calculator': {
      title: 'Position Size Calculator | CryptoCalk',
      description: 'Free Position Size Calculator for crypto traders. Determine optimal trade size based on account balance, risk tolerance, and stop-loss. Supports up to 125x leverage.'
    },
    'liquidation-calculator': {
      title: 'Liquidation Calculator | CryptoCalk',
      description: 'Free Liquidation Price Calculator for crypto futures. Supports Binance, Bybit, OKX with Isolated and Cross margin modes. Know when your position gets liquidated.'
    },
    'funding-rate-calculator': {
      title: 'Funding Rate Calculator | CryptoCalk',
      description: 'Free Funding Rate Calculator for perpetual futures. Calculate the daily, weekly, monthly, and annual cost of holding a leveraged position.'
    },
    'tp-sl-calculator': {
      title: 'TP / SL Calculator | CryptoCalk',
      description: 'Free TP/SL Calculator for crypto traders. Set optimal take-profit and stop-loss levels with R:R ratio, partial TPs, and visual price scale.'
    },
    'margin-calculator': {
      title: 'Margin Calculator | CryptoCalk',
      description: 'Free Margin Calculator for crypto futures. Calculate required margin, margin level, free margin, and margin call price for Binance, Bybit, and OKX.'
    },
    'pip-calculator': {
      title: 'Pip / Tick Value Calculator | CryptoCalk',
      description: 'Free Pip and Tick Value Calculator for crypto traders. Calculate the dollar value of price movements for any position size across BTC, ETH, SOL, and 500+ coins.'
    },
    'break-even-calculator': {
      title: 'Break-Even Calculator | CryptoCalk',
      description: 'Free Break-Even Calculator. See how much gain you need to recover from a loss, or calculate the exit price that covers your trading fees.'
    },
    'risk-reward-calculator': {
      title: 'Risk / Reward Calculator | CryptoCalk',
      description: 'Free Risk-Reward Ratio Calculator for crypto traders. Calculate R:R ratio, required win rate, and simulate 100-trade outcomes for any setup.'
    },
    'staking-calculator': {
      title: 'Crypto Staking Calculator | CryptoCalk',
      description: 'Free Crypto Staking Calculator. Calculate daily, weekly, and annual staking rewards after validator commission and token-price assumptions.'
    },
    'impermanent-loss-calculator': {
      title: 'Impermanent Loss Calculator | CryptoCalk',
      description: 'Free Impermanent Loss Calculator for DeFi. Calculate IL for AMM liquidity pools, compare LP returns vs HODLing, and see if fee earnings overcome IL.'
    },
    'apy-apr-calculator': {
      title: 'APY vs APR Calculator | CryptoCalk',
      description: 'Free APY vs APR Calculator. Convert between APR and APY, compare compounding frequencies, and calculate real earnings on DeFi yields and staking rewards.'
    },
    'yield-farming-calculator': {
      title: 'Yield Farming Calculator | CryptoCalk',
      description: 'Free Yield Farming Calculator. Calculate net DeFi farming profits including gas costs, impermanent loss, and harvest frequency to find your true APY.'
    },
    'gas-calculator': {
      title: 'Crypto Gas Calculator | CryptoCalk',
      description: 'Free Crypto Gas Calculator. Estimate gas costs across major EVM networks for swaps, transfers, and DeFi actions before confirming transactions.'
    },
    'uniswap-calculator': {
      title: 'Uniswap Fee Calculator | CryptoCalk',
      description: 'Free Uniswap Fee Calculator. Estimate LP fee income, impermanent loss impact, break-even time, and net outcome for selected pool assumptions.'
    },
    'bridge-comparator': {
      title: 'Bridge Cost Comparator | CryptoCalk',
      description: 'Free Bridge Cost Comparator. Compare crypto bridge routes by estimated total fee, speed, and security score across major L2 and multichain bridges.'
    },
    'lending-calculator': {
      title: 'Crypto Lending Calculator | CryptoCalk',
      description: 'Free Crypto Lending Calculator. Calculate projected lending returns using APY, compounding model, term length, and platform performance fees.'
    },
    'gpu-mining-calculator': {
      title: 'GPU Mining Calculator | CryptoCalk',
      description: 'Free GPU Mining Calculator. Estimate GPU mining profitability with live assumptions for hashrate, power draw, electricity rates, and pool fees.'
    },
    'asic-mining-calculator': {
      title: 'ASIC Mining Calculator | CryptoCalk',
      description: 'Free ASIC Mining Calculator. Calculate ASIC mining profitability, electricity cost, and break-even period across leading mining hardware models.'
    },
    'mining-roi-calculator': {
      title: 'Mining ROI Calculator | CryptoCalk',
      description: 'Free Mining ROI Calculator. Model mining hardware return on investment with scenario analysis for revenue, costs, and break-even timing.'
    },
    'electricity-cost-calculator': {
      title: 'Mining Electricity Cost Calculator | CryptoCalk',
      description: 'Free Mining Electricity Cost Calculator. Calculate power consumption and operating cost by device count, power usage, uptime, and local energy price.'
    },
    'difficulty-calculator': {
      title: 'Mining Difficulty Estimator | CryptoCalk',
      description: 'Free Mining Difficulty Estimator. Estimate how the next difficulty adjustment may impact your projected mining revenue and profitability.'
    },
    'hashrate-converter': {
      title: 'Hashrate Converter | CryptoCalk',
      description: 'Free Hashrate Converter. Convert mining hashrate units from H/s up to EH/s and compare typical ranges for ASIC and GPU hardware.'
    },
    'market-cap-calculator': {
      title: 'Market Cap Calculator | CryptoCalk',
      description: 'Free Market Cap Calculator. Calculate token price from market cap and supply, or market cap from token price, with live crypto reference data.'
    },
    'market-cap-comparator': {
      title: 'Market Cap Comparator | CryptoCalk',
      description: 'Free Market Cap Comparator. Compare any cryptocurrency against top coins. Calculate hypothetical prices and growth multipliers across market cap scenarios.'
    },
    'roi-calculator': {
      title: 'ROI Calculator | CryptoCalk',
      description: 'Free Crypto ROI Calculator with annualized returns. Calculate total and annualized ROI and compare performance with S&P 500, Gold, and Real Estate.'
    },
    'reverse-roi': {
      title: 'Reverse ROI Calculator | CryptoCalk',
      description: 'Free Reverse ROI Calculator. Enter your investment and target profit to find the exact token price needed. See growth multiplier and milestone table.'
    },
    'hodl-vs-trade': {
      title: 'HODL vs Trade Calculator | CryptoCalk',
      description: 'Free HODL vs Trade Simulator. Compare buy-and-hold with active trading strategies. Simulate trades with custom win rates, profit targets, and fees.'
    },
    'rebalancing-calculator': {
      title: 'Portfolio Rebalancing Calculator | CryptoCalk',
      description: 'Free Portfolio Rebalancing Calculator. Calculate buy/sell actions to rebalance your crypto portfolio toward target allocations with optional buy-only mode.'
    },
    'compound-calculator': {
      title: 'Compound Interest Calculator (Crypto) | CryptoCalk',
      description: 'Free Compound Interest Calculator for crypto. Project compound growth for staking, yield farming, and savings with recurring contributions.'
    },
    'ico-roi-calculator': {
      title: 'ICO / IDO ROI Calculator | CryptoCalk',
      description: 'Free ICO / IDO ROI Calculator. Calculate current and ATH ROI for ICO or IDO allocations using token amount, entry price, and market prices.'
    },
    'airdrop-calculator': {
      title: 'Airdrop Value Calculator | CryptoCalk',
      description: 'Free Airdrop Value Calculator. Calculate the value of received crypto airdrops, estimate tax liability, and track profit or loss after fees.'
    },
    'satoshi-converter': {
      title: 'Satoshi Converter | CryptoCalk',
      description: 'Free Satoshi Converter. Convert between Bitcoin, Satoshis, and USD/EUR instantly. See sats per dollar, quick reference tables, and live BTC price.'
    },
    'gwei-converter': {
      title: 'Gwei Converter | CryptoCalk',
      description: 'Free Gwei Converter. Convert Wei, Gwei, and Ether units instantly with live ETH price and practical gas cost examples for Ethereum transactions.'
    },
    'timestamp-converter': {
      title: 'Unix Timestamp Converter | CryptoCalk',
      description: 'Free Unix Timestamp Converter. Convert Unix timestamp to date/time and date/time to Unix format with UTC/local display and block-time estimates.'
    },
    'unit-converter': {
      title: 'Crypto Unit Converter | CryptoCalk',
      description: 'Free Crypto Unit Converter. Convert denomination units for BTC, ETH, SOL, and USDT including satoshi, gwei, lamport, and micro units.'
    },
    'exchange-fees': {
      title: 'Exchange Fee Comparator | CryptoCalk',
      description: 'Free Exchange Fee Comparator. Compare trading fees across Binance, Bybit, OKX, Coinbase, Kraken, and more with maker/taker fee breakdowns.'
    },
    'crypto-loan-calculator': {
      title: 'Crypto Loan Calculator | CryptoCalk',
      description: 'Free Crypto Loan Calculator. Estimate crypto-backed loan amount, interest costs, margin call threshold, and liquidation risk for DeFi and CeFi loans.'
    },
    'vesting-calculator': {
      title: 'Token Vesting Calculator | CryptoCalk',
      description: 'Free Token Vesting Calculator. Visualize unlock schedules with cliff periods, TGE unlocks, and monthly or quarterly vesting to plan your exit strategy.'
    },
    'nft-profit-calculator': {
      title: 'NFT Profit Calculator | CryptoCalk',
      description: 'Free NFT Profit Calculator. Calculate true NFT trading profit after marketplace fees, creator royalties, and gas costs across OpenSea, Blur, and more.'
    },
    'halving-calculator': {
      title: 'Bitcoin Halving Calculator | CryptoCalk',
      description: 'Free Bitcoin Halving Calculator with live countdown timer. See how the next BTC halving affects mining revenue with historical halving data and price analysis.'
    },
    'mev-calculator': {
      title: 'MEV Protection Calculator | CryptoCalk',
      description: 'Free MEV Protection Calculator. Estimate sandwich and frontrun risk and potential savings from MEV protection routes based on swap size and slippage.'
    },
    'gamefi-calculator': {
      title: 'GameFi ROI Calculator | CryptoCalk',
      description: 'Free GameFi ROI Calculator. Estimate payback period and annual ROI for play-to-earn strategies based on setup cost, token rewards, and running expenses.'
    },
    'node-calculator': {
      title: 'Validator Node Calculator | CryptoCalk',
      description: 'Free Validator Node Calculator. Model validator node economics using staked amount, APR, commission, uptime, and infrastructure costs.'
    },
    'salary-calculator': {
      title: 'Crypto Salary Calculator | CryptoCalk',
      description: 'Free Crypto Salary Calculator. Convert your fiat salary to BTC, ETH, or USDT. Calculate crypto accumulation over time with pay frequency and fee estimates.'
    },
    'inflation-hedge': {
      title: 'Inflation Hedge Calculator | CryptoCalk',
      description: 'Free Inflation Hedge Calculator. Compare crypto, stablecoins, gold, and S&P 500 against inflation in Turkey, Argentina, Nigeria, USA, and more.'
    },
  },
  'es': {
    'converter': {
      title: 'Conversor de Criptomonedas',
      description: 'Conversor de Criptomonedas gratuito. Convierte Bitcoin, Ethereum y 500+ criptos a USD, EUR y 10+ monedas fiat con precios de CoinGecko en tiempo real.'
    },
    'profit-calculator': {
      title: 'Calculadora de Ganancias Cripto',
      description: 'Calculadora de Ganancias Cripto gratuita. Ingresa precios de compra y venta para ver ROI, comisiones totales y beneficio neto para 500+ criptomonedas.'
    },
    'mining-calculator': {
      title: 'Calculadora de Minería de Bitcoin',
      description: 'Calculadora de Minería de Bitcoin gratuita. Ingresa hashrate, consumo eléctrico y coste de electricidad para estimar ingresos diarios, mensuales y anuales en BTC.'
    },
    'dca-calculator': {
      title: 'Calculadora DCA',
      description: 'Calculadora DCA gratuita para Bitcoin, Ethereum y 500+ criptos. Simula estrategias de inversión periódica con datos históricos y compara DCA vs inversión única.'
    },
    'tax-calculator': {
      title: 'Calculadora de Impuestos Cripto',
      description: 'Calculadora de Impuestos Cripto gratuita para 17 países. Estima impuestos sobre ganancias de capital y compara tasas a corto y largo plazo para EE.UU., España y más.'
    },
    'what-if': {
      title: 'Calculadora Y Si (What If)',
      description: 'Calculadora Y Si gratuita. Simula entradas hipotéticas en cripto, evalúa el coste de oportunidad y compara resultados de inversiones alternativas al instante.'
    },
    'position-size-calculator': {
      title: 'Calculadora de Tamaño de Posición',
      description: 'Calculadora de Tamaño de Posición gratuita para traders de cripto. Determina el tamaño óptimo según balance, tolerancia al riesgo y stop-loss. Hasta 125x apalancamiento.'
    },
    'liquidation-calculator': {
      title: 'Calculadora de Liquidación',
      description: 'Calculadora de Precio de Liquidación gratuita para futuros cripto. Compatible con Binance, Bybit, OKX en modos Aislado y Cruzado. Conoce cuándo se liquida tu posición.'
    },
    'funding-rate-calculator': {
      title: 'Calculadora de Tasa de Financiación',
      description: 'Calculadora de Funding Rate gratuita para futuros perpetuos. Calcula el coste diario, semanal, mensual y anual de mantener una posición apalancada.'
    },
    'tp-sl-calculator': {
      title: 'Calculadora TP / SL',
      description: 'Calculadora TP/SL gratuita para traders de cripto. Establece niveles óptimos de take-profit y stop-loss con ratio R:R, TPs parciales y escala visual de precios.'
    },
    'margin-calculator': {
      title: 'Calculadora de Margen',
      description: 'Calculadora de Margen gratuita para futuros cripto. Calcula margen requerido, nivel de margen, margen libre y precio de margin call en Binance, Bybit y OKX.'
    },
    'pip-calculator': {
      title: 'Calculadora de Valor de Pip',
      description: 'Calculadora de Valor de Pip gratuita para traders de cripto. Calcula el valor en dólares de los movimientos de precio para cualquier tamaño de posición en BTC, ETH, SOL y más.'
    },
    'break-even-calculator': {
      title: 'Calculadora de Punto de Equilibrio',
      description: 'Calculadora de Punto de Equilibrio gratuita. Descubre cuánta ganancia necesitas para recuperarte de una pérdida o calcula el precio de salida que cubre tus comisiones.'
    },
    'risk-reward-calculator': {
      title: 'Calculadora de Riesgo / Beneficio',
      description: 'Calculadora de Ratio Riesgo-Beneficio gratuita para traders de cripto. Calcula el ratio R:R, la tasa de acierto requerida y simula 100 operaciones para cualquier setup.'
    },
    'staking-calculator': {
      title: 'Calculadora de Staking Cripto',
      description: 'Calculadora de Staking Cripto gratuita. Calcula recompensas diarias, semanales y anuales de staking tras comisión del validador y proyecciones de precio del token.'
    },
    'impermanent-loss-calculator': {
      title: 'Calculadora de Pérdida Impermanente',
      description: 'Calculadora de Pérdida Impermanente gratuita para DeFi. Calcula IL para pools AMM, compara rendimientos LP vs HODL y evalúa si las comisiones compensan la pérdida.'
    },
    'apy-apr-calculator': {
      title: 'Calculadora APY vs APR',
      description: 'Calculadora APY vs APR gratuita. Convierte entre APR y APY, compara frecuencias de capitalización y calcula ganancias reales en rendimientos DeFi y staking.'
    },
    'yield-farming-calculator': {
      title: 'Calculadora de Yield Farming',
      description: 'Calculadora de Yield Farming gratuita. Calcula beneficios netos de farming DeFi incluyendo costes de gas, pérdida impermanente y frecuencia de cosecha para tu APY real.'
    },
    'gas-calculator': {
      title: 'Calculadora de Gas Cripto',
      description: 'Calculadora de Gas Cripto gratuita. Estima costes de gas en redes EVM principales para swaps, transferencias y acciones DeFi antes de confirmar transacciones.'
    },
    'uniswap-calculator': {
      title: 'Calculadora de Comisiones Uniswap',
      description: 'Calculadora de Comisiones Uniswap gratuita. Estima ingresos por comisiones LP, impacto de pérdida impermanente, tiempo de recuperación y resultado neto del pool.'
    },
    'bridge-comparator': {
      title: 'Comparador de Costes de Bridge',
      description: 'Comparador de Costes de Bridge gratuito. Compara rutas de puentes cripto por comisión total estimada, velocidad y puntuación de seguridad entre bridges L2 y multichain.'
    },
    'lending-calculator': {
      title: 'Calculadora de Préstamos Cripto',
      description: 'Calculadora de Préstamos Cripto gratuita. Calcula rendimientos proyectados de lending usando APY, modelo de capitalización, plazo y comisiones de plataforma.'
    },
    'gpu-mining-calculator': {
      title: 'Calculadora de Minería GPU',
      description: 'Calculadora de Minería GPU gratuita. Estima la rentabilidad de minería con GPU usando hashrate, consumo eléctrico, tarifas de electricidad y comisiones de pool.'
    },
    'asic-mining-calculator': {
      title: 'Calculadora de Minería ASIC',
      description: 'Calculadora de Minería ASIC gratuita. Calcula rentabilidad de minería ASIC, coste eléctrico y período de recuperación para los principales modelos de hardware.'
    },
    'mining-roi-calculator': {
      title: 'Calculadora ROI de Minería',
      description: 'Calculadora ROI de Minería gratuita. Modela el retorno de inversión en hardware de minería con análisis de escenarios para ingresos, costes y punto de equilibrio.'
    },
    'electricity-cost-calculator': {
      title: 'Calculadora de Coste Eléctrico de Minería',
      description: 'Calculadora de Coste Eléctrico de Minería gratuita. Calcula consumo energético y coste operativo por número de dispositivos, potencia, tiempo de actividad y tarifa local.'
    },
    'difficulty-calculator': {
      title: 'Estimador de Dificultad de Minería',
      description: 'Estimador de Dificultad de Minería gratuito. Estima cómo el próximo ajuste de dificultad puede impactar tus ingresos y rentabilidad de minería proyectados.'
    },
    'hashrate-converter': {
      title: 'Conversor de Hashrate',
      description: 'Conversor de Hashrate gratuito. Convierte unidades de hashrate desde H/s hasta EH/s y compara rangos típicos para hardware ASIC y GPU.'
    },
    'market-cap-calculator': {
      title: 'Calculadora de Capitalización de Mercado',
      description: 'Calculadora de Capitalización de Mercado gratuita. Calcula precio del token a partir de market cap y suministro, o market cap a partir del precio, con datos cripto en vivo.'
    },
    'market-cap-comparator': {
      title: 'Comparador de Capitalización de Mercado',
      description: 'Comparador de Capitalización de Mercado gratuito. Compara cualquier cripto con las principales monedas. Calcula precios hipotéticos y multiplicadores de crecimiento.'
    },
    'roi-calculator': {
      title: 'Calculadora de ROI',
      description: 'Calculadora de ROI Cripto gratuita con rendimientos anualizados. Calcula ROI total y anualizado y compara rendimiento con S&P 500, Oro e Inmobiliario.'
    },
    'reverse-roi': {
      title: 'Calculadora de ROI Inverso',
      description: 'Calculadora de ROI Inverso gratuita. Ingresa tu inversión y beneficio objetivo para encontrar el precio exacto del token necesario. Incluye multiplicador y tabla de hitos.'
    },
    'hodl-vs-trade': {
      title: 'Calculadora HODL vs Trading',
      description: 'Simulador HODL vs Trading gratuito. Compara buy-and-hold con trading activo. Simula operaciones con tasas de acierto, objetivos de beneficio y comisiones personalizadas.'
    },
    'rebalancing-calculator': {
      title: 'Calculadora de Rebalanceo de Cartera',
      description: 'Calculadora de Rebalanceo de Cartera gratuita. Calcula acciones de compra/venta para rebalancear tu portafolio cripto hacia asignaciones objetivo con modo solo-compra.'
    },
    'compound-calculator': {
      title: 'Calculadora de Interés Compuesto (Cripto)',
      description: 'Calculadora de Interés Compuesto para cripto gratuita. Proyecta crecimiento compuesto para staking, yield farming y ahorros con aportaciones recurrentes.'
    },
    'ico-roi-calculator': {
      title: 'Calculadora de ROI de ICO / IDO',
      description: 'Calculadora de ROI de ICO / IDO gratuita. Calcula el ROI actual y en ATH para asignaciones de ICO o IDO usando cantidad de tokens, precio de entrada y precios de mercado.'
    },
    'airdrop-calculator': {
      title: 'Calculadora de Valor de Airdrop',
      description: 'Calculadora de Valor de Airdrop gratuita. Calcula el valor de airdrops cripto recibidos, estima la obligación fiscal y rastrea ganancia o pérdida tras comisiones.'
    },
    'satoshi-converter': {
      title: 'Conversor de Satoshis',
      description: 'Conversor de Satoshis gratuito. Convierte entre Bitcoin, Satoshis y USD/EUR al instante. Muestra sats por dólar, tablas de referencia rápida y precio BTC en vivo.'
    },
    'gwei-converter': {
      title: 'Conversor de Gwei',
      description: 'Conversor de Gwei gratuito. Convierte unidades Wei, Gwei y Ether al instante con precio ETH en vivo y ejemplos prácticos de coste de gas para Ethereum.'
    },
    'timestamp-converter': {
      title: 'Conversor de Marca de Tiempo Unix',
      description: 'Conversor de Marca de Tiempo Unix gratuito. Convierte timestamp Unix a fecha/hora y viceversa con visualización UTC/local y estimaciones de tiempo de bloque.'
    },
    'unit-converter': {
      title: 'Conversor de Unidades Cripto',
      description: 'Conversor de Unidades Cripto gratuito. Convierte unidades de denominación para BTC, ETH, SOL y USDT incluyendo satoshi, gwei, lamport y micro unidades.'
    },
    'exchange-fees': {
      title: 'Comparador de Comisiones de Exchanges',
      description: 'Comparador de Comisiones de Exchanges gratuito. Compara comisiones de trading en Binance, Bybit, OKX, Coinbase, Kraken y más con desglose de tarifas maker/taker.'
    },
    'crypto-loan-calculator': {
      title: 'Calculadora de Préstamo Cripto',
      description: 'Calculadora de Préstamo Cripto gratuita. Estima monto del préstamo, costes de interés, umbral de margin call y riesgo de liquidación para préstamos DeFi y CeFi.'
    },
    'vesting-calculator': {
      title: 'Calculadora de Vesting de Tokens',
      description: 'Calculadora de Vesting de Tokens gratuita. Visualiza calendarios de desbloqueo con períodos de cliff, TGE y vesting mensual o trimestral para planificar tu estrategia de salida.'
    },
    'nft-profit-calculator': {
      title: 'Calculadora de Ganancias NFT',
      description: 'Calculadora de Ganancias NFT gratuita. Calcula el beneficio real del trading de NFT tras comisiones del marketplace, regalías del creador y costes de gas en OpenSea, Blur y más.'
    },
    'halving-calculator': {
      title: 'Calculadora de Halving de Bitcoin',
      description: 'Calculadora de Halving de Bitcoin gratuita con cuenta regresiva en vivo. Descubre cómo el próximo halving de BTC afecta los ingresos de minería con datos históricos y análisis de precios.'
    },
    'mev-calculator': {
      title: 'Calculadora de Protección MEV',
      description: 'Calculadora de Protección MEV gratuita. Estima el riesgo de ataques sandwich y frontrun, y los ahorros potenciales de rutas con protección MEV según tamaño del swap y slippage.'
    },
    'gamefi-calculator': {
      title: 'Calculadora ROI de GameFi',
      description: 'Calculadora ROI de GameFi gratuita. Estima período de recuperación y ROI anual para estrategias play-to-earn basado en coste de setup, recompensas de token y gastos operativos.'
    },
    'node-calculator': {
      title: 'Calculadora de Nodo Validador',
      description: 'Calculadora de Nodo Validador gratuita. Modela la economía del nodo validador usando cantidad stakeada, APR, comisión, uptime y costes de infraestructura.'
    },
    'salary-calculator': {
      title: 'Calculadora de Salario Cripto',
      description: 'Calculadora de Salario Cripto gratuita. Convierte tu salario fiat a BTC, ETH o USDT. Calcula acumulación de cripto a lo largo del tiempo con frecuencia de pago y comisiones.'
    },
    'inflation-hedge': {
      title: 'Calculadora de Cobertura de Inflación',
      description: 'Calculadora de Cobertura de Inflación gratuita. Compara cripto, stablecoins, oro y S&P 500 contra la inflación en Turquía, Argentina, Nigeria, EE.UU. y más.'
    },
  },
  'pt': {
    'converter': {
      title: 'Conversor de Criptomoedas',
      description: 'Conversor de Criptomoedas gratuito. Converta Bitcoin, Ethereum e 500+ criptos para USD, EUR e 10+ moedas fiat com preços CoinGecko em tempo real.'
    },
    'profit-calculator': {
      title: 'Calculadora de Lucro Cripto',
      description: 'Calculadora de Lucro Cripto gratuita. Insira preços de compra e venda para ver ROI, taxas totais e lucro líquido para 500+ criptomoedas.'
    },
    'mining-calculator': {
      title: 'Calculadora de Mineração de Bitcoin',
      description: 'Calculadora de Mineração de Bitcoin gratuita. Insira hashrate, consumo de energia e custo de eletricidade para estimar receita diária, mensal e anual em BTC.'
    },
    'dca-calculator': {
      title: 'Calculadora DCA',
      description: 'Calculadora DCA gratuita para Bitcoin, Ethereum e 500+ criptos. Simule estratégias de investimento periódico com dados históricos e compare DCA vs investimento único.'
    },
    'tax-calculator': {
      title: 'Calculadora de Impostos Cripto',
      description: 'Calculadora de Impostos Cripto gratuita para 17 países. Estime impostos sobre ganhos de capital e compare taxas de curto e longo prazo para EUA, Brasil, Portugal e mais.'
    },
    'what-if': {
      title: 'Calculadora E Se (What If)',
      description: 'Calculadora E Se gratuita. Simule entradas hipotéticas em cripto, avalie o custo de oportunidade e compare resultados de investimentos alternativos instantaneamente.'
    },
    'position-size-calculator': {
      title: 'Calculadora de Tamanho de Posição',
      description: 'Calculadora de Tamanho de Posição gratuita para traders de cripto. Determine o tamanho ideal da operação com base no saldo, tolerância ao risco e stop-loss. Até 125x de alavancagem.'
    },
    'liquidation-calculator': {
      title: 'Calculadora de Liquidação',
      description: 'Calculadora de Preço de Liquidação gratuita para futuros cripto. Compatível com Binance, Bybit, OKX nos modos Isolado e Cruzado. Saiba quando sua posição será liquidada.'
    },
    'funding-rate-calculator': {
      title: 'Calculadora de Taxa de Financiamento',
      description: 'Calculadora de Funding Rate gratuita para futuros perpétuos. Calcule o custo diário, semanal, mensal e anual de manter uma posição alavancada.'
    },
    'tp-sl-calculator': {
      title: 'Calculadora TP / SL',
      description: 'Calculadora TP/SL gratuita para traders de cripto. Defina níveis ideais de take-profit e stop-loss com razão R:R, TPs parciais e escala visual de preços.'
    },
    'margin-calculator': {
      title: 'Calculadora de Margem',
      description: 'Calculadora de Margem gratuita para futuros cripto. Calcule margem requerida, nível de margem, margem livre e preço de margin call na Binance, Bybit e OKX.'
    },
    'pip-calculator': {
      title: 'Calculadora de Valor de Pip',
      description: 'Calculadora de Valor de Pip gratuita para traders de cripto. Calcule o valor em dólares dos movimentos de preço para qualquer tamanho de posição em BTC, ETH, SOL e mais.'
    },
    'break-even-calculator': {
      title: 'Calculadora de Ponto de Equilíbrio',
      description: 'Calculadora de Ponto de Equilíbrio gratuita. Descubra quanto ganho você precisa para se recuperar de uma perda ou calcule o preço de saída que cobre suas taxas.'
    },
    'risk-reward-calculator': {
      title: 'Calculadora de Risco / Retorno',
      description: 'Calculadora de Razão Risco-Retorno gratuita para traders de cripto. Calcule a razão R:R, taxa de acerto necessária e simule 100 operações para qualquer setup.'
    },
    'staking-calculator': {
      title: 'Calculadora de Staking Cripto',
      description: 'Calculadora de Staking Cripto gratuita. Calcule recompensas diárias, semanais e anuais de staking após comissão do validador e projeções de preço do token.'
    },
    'impermanent-loss-calculator': {
      title: 'Calculadora de Perda Impermanente',
      description: 'Calculadora de Perda Impermanente gratuita para DeFi. Calcule IL para pools AMM, compare retornos LP vs HODL e avalie se as taxas compensam a perda.'
    },
    'apy-apr-calculator': {
      title: 'Calculadora APY vs APR',
      description: 'Calculadora APY vs APR gratuita. Converta entre APR e APY, compare frequências de capitalização e calcule ganhos reais em rendimentos DeFi e staking.'
    },
    'yield-farming-calculator': {
      title: 'Calculadora de Yield Farming',
      description: 'Calculadora de Yield Farming gratuita. Calcule lucros líquidos de farming DeFi incluindo custos de gas, perda impermanente e frequência de colheita para seu APY real.'
    },
    'gas-calculator': {
      title: 'Calculadora de Gas Cripto',
      description: 'Calculadora de Gas Cripto gratuita. Estime custos de gas nas principais redes EVM para swaps, transferências e ações DeFi antes de confirmar transações.'
    },
    'uniswap-calculator': {
      title: 'Calculadora de Taxas Uniswap',
      description: 'Calculadora de Taxas Uniswap gratuita. Estime receita de taxas LP, impacto de perda impermanente, tempo de equilíbrio e resultado líquido do pool.'
    },
    'bridge-comparator': {
      title: 'Comparador de Custos de Bridge',
      description: 'Comparador de Custos de Bridge gratuito. Compare rotas de pontes cripto por taxa total estimada, velocidade e pontuação de segurança entre bridges L2 e multichain.'
    },
    'lending-calculator': {
      title: 'Calculadora de Empréstimos Cripto',
      description: 'Calculadora de Empréstimos Cripto gratuita. Calcule retornos projetados de lending usando APY, modelo de capitalização, prazo e taxas de plataforma.'
    },
    'gpu-mining-calculator': {
      title: 'Calculadora de Mineração GPU',
      description: 'Calculadora de Mineração GPU gratuita. Estime a rentabilidade da mineração com GPU usando hashrate, consumo de energia, tarifas de eletricidade e taxas de pool.'
    },
    'asic-mining-calculator': {
      title: 'Calculadora de Mineração ASIC',
      description: 'Calculadora de Mineração ASIC gratuita. Calcule rentabilidade de mineração ASIC, custo de eletricidade e período de retorno para os principais modelos de hardware.'
    },
    'mining-roi-calculator': {
      title: 'Calculadora ROI de Mineração',
      description: 'Calculadora ROI de Mineração gratuita. Modele o retorno sobre investimento em hardware de mineração com análise de cenários para receita, custos e ponto de equilíbrio.'
    },
    'electricity-cost-calculator': {
      title: 'Calculadora de Custo de Eletricidade para Mineração',
      description: 'Calculadora de Custo de Eletricidade para Mineração gratuita. Calcule consumo de energia e custo operacional por dispositivos, potência, uptime e tarifa local.'
    },
    'difficulty-calculator': {
      title: 'Avaliador de Dificuldade de Mineração',
      description: 'Avaliador de Dificuldade de Mineração gratuito. Estime como o próximo ajuste de dificuldade pode impactar sua receita e rentabilidade de mineração projetadas.'
    },
    'hashrate-converter': {
      title: 'Conversor de Hashrate',
      description: 'Conversor de Hashrate gratuito. Converta unidades de hashrate de H/s até EH/s e compare faixas típicas para hardware ASIC e GPU.'
    },
    'market-cap-calculator': {
      title: 'Calculadora de Capitalização de Mercado',
      description: 'Calculadora de Capitalização de Mercado gratuita. Calcule preço do token a partir do market cap e oferta, ou market cap a partir do preço, com dados cripto em tempo real.'
    },
    'market-cap-comparator': {
      title: 'Comparador de Capitalização de Mercado',
      description: 'Comparador de Capitalização de Mercado gratuito. Compare qualquer cripto com as principais moedas. Calcule preços hipotéticos e multiplicadores de crescimento.'
    },
    'roi-calculator': {
      title: 'Calculadora de ROI',
      description: 'Calculadora de ROI Cripto gratuita com retornos anualizados. Calcule ROI total e anualizado e compare desempenho com S&P 500, Ouro e Imóveis.'
    },
    'reverse-roi': {
      title: 'Calculadora de ROI Reverso',
      description: 'Calculadora de ROI Reverso gratuita. Insira seu investimento e lucro alvo para encontrar o preço exato do token necessário. Inclui multiplicador e tabela de marcos.'
    },
    'hodl-vs-trade': {
      title: 'Calculadora HODL vs Trading',
      description: 'Simulador HODL vs Trading gratuito. Compare buy-and-hold com trading ativo. Simule operações com taxas de acerto, alvos de lucro e comissões personalizadas.'
    },
    'rebalancing-calculator': {
      title: 'Calculadora de Rebalanceamento de Carteira',
      description: 'Calculadora de Rebalanceamento de Carteira gratuita. Calcule ações de compra/venda para rebalancear seu portfólio cripto para alocações alvo com modo somente-compra.'
    },
    'compound-calculator': {
      title: 'Calculadora de Juros Compostos (Cripto)',
      description: 'Calculadora de Juros Compostos para cripto gratuita. Projete crescimento composto para staking, yield farming e poupança com contribuições recorrentes.'
    },
    'ico-roi-calculator': {
      title: 'Calculadora de ROI de ICO / IDO',
      description: 'Calculadora de ROI de ICO / IDO gratuita. Calcule ROI atual e em ATH para alocações de ICO ou IDO usando quantidade de tokens, preço de entrada e preços de mercado.'
    },
    'airdrop-calculator': {
      title: 'Calculadora de Valor de Airdrop',
      description: 'Calculadora de Valor de Airdrop gratuita. Calcule o valor de airdrops cripto recebidos, estime a obrigação fiscal e acompanhe lucro ou perda após taxas.'
    },
    'satoshi-converter': {
      title: 'Conversor de Satoshi',
      description: 'Conversor de Satoshi gratuito. Converta entre Bitcoin, Satoshis e USD/EUR instantaneamente. Veja sats por dólar, tabelas de referência rápida e preço BTC ao vivo.'
    },
    'gwei-converter': {
      title: 'Conversor de Gwei',
      description: 'Conversor de Gwei gratuito. Converta unidades Wei, Gwei e Ether instantaneamente com preço ETH ao vivo e exemplos práticos de custo de gas para Ethereum.'
    },
    'timestamp-converter': {
      title: 'Conversor de Timestamp Unix',
      description: 'Conversor de Timestamp Unix gratuito. Converta timestamp Unix para data/hora e vice-versa com exibição UTC/local e estimativas de tempo de bloco.'
    },
    'unit-converter': {
      title: 'Conversor de Unidades Cripto',
      description: 'Conversor de Unidades Cripto gratuito. Converta unidades de denominação para BTC, ETH, SOL e USDT incluindo satoshi, gwei, lamport e micro unidades.'
    },
    'exchange-fees': {
      title: 'Comparador de Taxas de Exchanges',
      description: 'Comparador de Taxas de Exchanges gratuito. Compare taxas de trading na Binance, Bybit, OKX, Coinbase, Kraken e mais com detalhamento de tarifas maker/taker.'
    },
    'crypto-loan-calculator': {
      title: 'Calculadora de Empréstimo Cripto',
      description: 'Calculadora de Empréstimo Cripto gratuita. Estime valor do empréstimo, custos de juros, limite de margin call e risco de liquidação para empréstimos DeFi e CeFi.'
    },
    'vesting-calculator': {
      title: 'Calculadora de Vesting de Tokens',
      description: 'Calculadora de Vesting de Tokens gratuita. Visualize cronogramas de desbloqueio com períodos de cliff, TGE e vesting mensal ou trimestral para planejar sua estratégia de saída.'
    },
    'nft-profit-calculator': {
      title: 'Calculadora de Lucro NFT',
      description: 'Calculadora de Lucro NFT gratuita. Calcule o lucro real do trading de NFT após taxas do marketplace, royalties do criador e custos de gas no OpenSea, Blur e mais.'
    },
    'halving-calculator': {
      title: 'Calculadora de Halving do Bitcoin',
      description: 'Calculadora de Halving do Bitcoin gratuita com contagem regressiva ao vivo. Veja como o próximo halving do BTC afeta a receita de mineração com dados históricos e análise de preços.'
    },
    'mev-calculator': {
      title: 'Calculadora de Proteção MEV',
      description: 'Calculadora de Proteção MEV gratuita. Estime risco de ataques sandwich e frontrun, e economias potenciais de rotas com proteção MEV baseado no tamanho do swap e slippage.'
    },
    'gamefi-calculator': {
      title: 'Calculadora de ROI GameFi',
      description: 'Calculadora de ROI GameFi gratuita. Estime período de retorno e ROI anual para estratégias play-to-earn com base no custo de setup, recompensas de token e despesas.'
    },
    'node-calculator': {
      title: 'Calculadora de Nó Validador',
      description: 'Calculadora de Nó Validador gratuita. Modele a economia do nó validador usando quantidade staked, APR, comissão, uptime e custos de infraestrutura.'
    },
    'salary-calculator': {
      title: 'Calculadora de Salário Cripto',
      description: 'Calculadora de Salário Cripto gratuita. Converta seu salário fiat para BTC, ETH ou USDT. Calcule acumulação de cripto ao longo do tempo com frequência de pagamento e taxas.'
    },
    'inflation-hedge': {
      title: 'Calculadora de Proteção contra Inflação',
      description: 'Calculadora de Proteção contra Inflação gratuita. Compare cripto, stablecoins, ouro e S&P 500 contra a inflação na Turquia, Argentina, Nigéria, EUA e mais.'
    },
  },
  'tr': {
    'converter': {
      title: 'Kripto Para Dönüştürücü',
      description: 'Ücretsiz Kripto Para Dönüştürücü. Bitcoin, Ethereum ve 500+ kripto parayı USD, EUR ve 10+ fiat para birimine gerçek zamanlı CoinGecko fiyatlarıyla dönüştürün.'
    },
    'profit-calculator': {
      title: 'Kripto Kar Hesaplayıcı',
      description: 'Ücretsiz Kripto Kar Hesaplayıcı. Alış ve satış fiyatlarını girerek 500+ kripto para için ROI, toplam komisyon ve net karı anında görün.'
    },
    'mining-calculator': {
      title: 'Bitcoin Madencilik Hesaplayıcı',
      description: 'Ücretsiz Bitcoin Madencilik Hesaplayıcı. Hashrate, güç tüketimi ve elektrik maliyetini girerek günlük, aylık ve yıllık BTC madencilik gelirini tahmin edin.'
    },
    'dca-calculator': {
      title: 'DCA Hesaplayıcı',
      description: 'Ücretsiz DCA Hesaplayıcı. Bitcoin, Ethereum ve 500+ kripto için düzenli yatırım stratejilerini geçmiş verilerle simüle edin, DCA ve toplu yatırımı karşılaştırın.'
    },
    'tax-calculator': {
      title: 'Kripto Vergi Hesaplayıcı',
      description: 'Ücretsiz Kripto Vergi Hesaplayıcı. 17 ülke için sermaye kazancı vergisini tahmin edin, ABD, Türkiye, Almanya ve daha fazlası için kısa ve uzun vadeli oranları karşılaştırın.'
    },
    'what-if': {
      title: 'Ya Öyle Olsaydı Hesaplayıcı',
      description: 'Ücretsiz Ya Öyle Olsaydı Hesaplayıcı. Varsayımsal kripto girişlerini simüle edin, fırsat maliyetini değerlendirin ve alternatif yatırım sonuçlarını karşılaştırın.'
    },
    'position-size-calculator': {
      title: 'Pozisyon Boyutu Hesaplayıcı',
      description: 'Ücretsiz Pozisyon Boyutu Hesaplayıcı. Bakiye, risk toleransı ve stop-loss seviyesine göre optimal işlem boyutunu belirleyin. 125x kaldıraca kadar destek.'
    },
    'liquidation-calculator': {
      title: 'Likidasyon Hesaplayıcı',
      description: 'Ücretsiz Likidasyon Fiyatı Hesaplayıcı. Binance, Bybit, OKX ile İzole ve Çapraz marjin modlarında pozisyonunuzun ne zaman likide edileceğini öğrenin.'
    },
    'funding-rate-calculator': {
      title: 'Fonlama Oranı Hesaplayıcı',
      description: 'Ücretsiz Fonlama Oranı Hesaplayıcı. Kaldıraçlı pozisyon tutmanın günlük, haftalık, aylık ve yıllık maliyetini hesaplayın.'
    },
    'tp-sl-calculator': {
      title: 'TP / SL Hesaplayıcı',
      description: 'Ücretsiz TP/SL Hesaplayıcı. R:R oranı, kısmi TP seviyeleri ve görsel fiyat ölçeği ile optimal kar alma ve zarar durdurma seviyelerini belirleyin.'
    },
    'margin-calculator': {
      title: 'Marjin Hesaplayıcı',
      description: 'Ücretsiz Marjin Hesaplayıcı. Binance, Bybit ve OKX için gerekli marjin, marjin seviyesi, serbest marjin ve margin call fiyatını hesaplayın.'
    },
    'pip-calculator': {
      title: 'Pip / Tick Değeri Hesaplayıcı',
      description: 'Ücretsiz Pip/Tick Değeri Hesaplayıcı. BTC, ETH, SOL ve 500+ coin için herhangi bir pozisyon boyutundaki fiyat hareketinin dolar değerini hesaplayın.'
    },
    'break-even-calculator': {
      title: 'Başa Baş Hesaplayıcı',
      description: 'Ücretsiz Başa Baş Hesaplayıcı. Bir kayıptan kurtulmak için gereken kazancı öğrenin veya işlem komisyonlarınızı karşılayan çıkış fiyatını hesaplayın.'
    },
    'risk-reward-calculator': {
      title: 'Risk / Ödül Hesaplayıcı',
      description: 'Ücretsiz Risk/Ödül Oranı Hesaplayıcı. R:R oranını, gereken kazanma oranını hesaplayın ve herhangi bir kurulum için 100 işlem simülasyonu yapın.'
    },
    'staking-calculator': {
      title: 'Kripto Staking Hesaplayıcı',
      description: 'Ücretsiz Kripto Staking Hesaplayıcı. Validatör komisyonu ve token fiyat projeksiyonları sonrası günlük, haftalık ve yıllık staking ödüllerini hesaplayın.'
    },
    'impermanent-loss-calculator': {
      title: 'Geçici Kayıp Hesaplayıcı',
      description: 'Ücretsiz Geçici Kayıp Hesaplayıcı. AMM likidite havuzları için IL hesaplayın, LP getirilerini HODL ile karşılaştırın ve komisyon gelirinin kaybı telafi edip etmediğini görün.'
    },
    'apy-apr-calculator': {
      title: 'APY ve APR Hesaplayıcı',
      description: 'Ücretsiz APY ve APR Hesaplayıcı. APR ve APY arasında dönüştürme yapın, bileşik faiz sıklıklarını karşılaştırın ve DeFi ile staking kazançlarınızı hesaplayın.'
    },
    'yield-farming-calculator': {
      title: 'Getiri Çiftçiliği Hesaplayıcı',
      description: 'Ücretsiz Getiri Çiftçiliği Hesaplayıcı. Gas maliyetleri, geçici kayıp ve hasat sıklığını dahil ederek gerçek DeFi farming APY ve net karınızı hesaplayın.'
    },
    'gas-calculator': {
      title: 'Kripto Gas Hesaplayıcı',
      description: 'Ücretsiz Kripto Gas Hesaplayıcı. Swap, transfer ve DeFi işlemleri için ana EVM ağlarındaki gas maliyetlerini işlem onaylamadan önce tahmin edin.'
    },
    'uniswap-calculator': {
      title: 'Uniswap Ücret Hesaplayıcı',
      description: 'Ücretsiz Uniswap Ücret Hesaplayıcı. LP komisyon gelirini, geçici kayıp etkisini, başa baş süresini ve havuz net sonucunu tahmin edin.'
    },
    'bridge-comparator': {
      title: 'Köprü Maliyet Karşılaştırıcı',
      description: 'Ücretsiz Köprü Maliyet Karşılaştırıcı. Kripto köprü rotalarını tahmini toplam ücret, hız ve güvenlik puanına göre L2 ve multichain köprüler arasında karşılaştırın.'
    },
    'lending-calculator': {
      title: 'Kripto Borç Verme Hesaplayıcı',
      description: 'Ücretsiz Kripto Borç Verme Hesaplayıcı. APY, bileşik faiz modeli, vade ve platform komisyonlarını kullanarak öngörülen lending getirilerini hesaplayın.'
    },
    'gpu-mining-calculator': {
      title: 'GPU Madencilik Hesaplayıcı',
      description: 'Ücretsiz GPU Madencilik Hesaplayıcı. Hashrate, güç tüketimi, elektrik tarifeleri ve havuz komisyonlarıyla GPU madencilik karlılığını tahmin edin.'
    },
    'asic-mining-calculator': {
      title: 'ASIC Madencilik Hesaplayıcı',
      description: 'Ücretsiz ASIC Madencilik Hesaplayıcı. Önde gelen donanım modelleri için ASIC madencilik karlılığını, elektrik maliyetini ve geri ödeme süresini hesaplayın.'
    },
    'mining-roi-calculator': {
      title: 'Madencilik ROI Hesaplayıcı',
      description: 'Ücretsiz Madencilik ROI Hesaplayıcı. Gelir, maliyet ve başa baş zamanlaması için senaryo analiziyle madencilik donanımı yatırım getirisini modelleyin.'
    },
    'electricity-cost-calculator': {
      title: 'Madencilik Elektrik Maliyeti Hesaplayıcı',
      description: 'Ücretsiz Madencilik Elektrik Maliyeti Hesaplayıcı. Cihaz sayısı, güç kullanımı, çalışma süresi ve yerel enerji fiyatına göre güç tüketimini ve işletme maliyetini hesaplayın.'
    },
    'difficulty-calculator': {
      title: 'Madencilik Zorluk Tahmincisi',
      description: 'Ücretsiz Madencilik Zorluk Tahmincisi. Bir sonraki zorluk ayarlamasının öngörülen madencilik gelirinizi ve karlılığınızı nasıl etkileyebileceğini tahmin edin.'
    },
    'hashrate-converter': {
      title: 'Hashrate Dönüştürücü',
      description: 'Ücretsiz Hashrate Dönüştürücü. H/s ile EH/s arasında madencilik hashrate birimlerini dönüştürün ve ASIC ile GPU donanımları için tipik aralıkları karşılaştırın.'
    },
    'market-cap-calculator': {
      title: 'Piyasa Değeri Hesaplayıcı',
      description: 'Ücretsiz Piyasa Değeri Hesaplayıcı. Piyasa değeri ve arzdan token fiyatını veya token fiyatından piyasa değerini canlı kripto verileriyle hesaplayın.'
    },
    'market-cap-comparator': {
      title: 'Piyasa Değeri Karşılaştırıcı',
      description: 'Ücretsiz Piyasa Değeri Karşılaştırıcı. Herhangi bir kripto parayı en büyük coinlerle karşılaştırın. Varsayımsal fiyatları ve büyüme çarpanlarını hesaplayın.'
    },
    'roi-calculator': {
      title: 'ROI Hesaplayıcı',
      description: 'Ücretsiz Kripto ROI Hesaplayıcı. Toplam ve yıllık ROI hesaplayın, performansı S&P 500, Altın ve Gayrimenkul ile karşılaştırın.'
    },
    'reverse-roi': {
      title: 'Ters ROI Hesaplayıcı',
      description: 'Ücretsiz Ters ROI Hesaplayıcı. Yatırım ve hedef karı girerek gereken token fiyatını bulun. Büyüme çarpanı ve kilometre taşı tablosu dahil.'
    },
    'hodl-vs-trade': {
      title: 'HODL vs Trade Hesaplayıcı',
      description: 'Ücretsiz HODL vs Trade Simülatörü. Uzun vadeli tutma ile aktif ticareti karşılaştırın. Özel kazanma oranları, kar hedefleri ve komisyonlarla işlem simüle edin.'
    },
    'rebalancing-calculator': {
      title: 'Portföy Yeniden Dengeleme Hesaplayıcı',
      description: 'Ücretsiz Portföy Yeniden Dengeleme Hesaplayıcı. Kripto portföyünüzü hedef dağılımlara göre yeniden dengelemek için alım/satım eylemlerini hesaplayın.'
    },
    'compound-calculator': {
      title: 'Bileşik Faiz Hesaplayıcı (Kripto)',
      description: 'Ücretsiz Bileşik Faiz Hesaplayıcı. Staking, getiri çiftçiliği ve tasarruflar için düzenli katkılarla bileşik büyümeyi öngörün.'
    },
    'ico-roi-calculator': {
      title: 'ICO / IDO ROI Hesaplayıcı',
      description: 'Ücretsiz ICO/IDO ROI Hesaplayıcı. Token miktarı, giriş fiyatı ve piyasa fiyatlarını kullanarak ICO veya IDO tahsisatları için güncel ve ATH ROI hesaplayın.'
    },
    'airdrop-calculator': {
      title: 'Airdrop Değer Hesaplayıcı',
      description: 'Ücretsiz Airdrop Değer Hesaplayıcı. Alınan kripto airdroplarının değerini hesaplayın, vergi yükümlülüğünü tahmin edin ve komisyonlar sonrası kar/zararı takip edin.'
    },
    'satoshi-converter': {
      title: 'Satoshi Dönüştürücü',
      description: 'Ücretsiz Satoshi Dönüştürücü. Bitcoin, Satoshi ve USD/EUR arasında anında dönüştürme yapın. Dolar başına sats, hızlı referans tabloları ve canlı BTC fiyatı.'
    },
    'gwei-converter': {
      title: 'Gwei Dönüştürücü',
      description: 'Ücretsiz Gwei Dönüştürücü. Wei, Gwei ve Ether birimlerini canlı ETH fiyatı ve Ethereum işlemleri için pratik gas maliyeti örnekleriyle anında dönüştürün.'
    },
    'timestamp-converter': {
      title: 'Unix Zaman Damgası Dönüştürücü',
      description: 'Ücretsiz Unix Zaman Damgası Dönüştürücü. Unix timestamp ile tarih/saat arasında UTC/yerel gösterimle ve blok süresi tahminleriyle dönüştürme yapın.'
    },
    'unit-converter': {
      title: 'Kripto Birim Dönüştürücü',
      description: 'Ücretsiz Kripto Birim Dönüştürücü. BTC, ETH, SOL ve USDT için satoshi, gwei, lamport ve mikro birimler dahil birim dönüştürmeleri yapın.'
    },
    'exchange-fees': {
      title: 'Borsa Ücret Karşılaştırıcı',
      description: 'Ücretsiz Borsa Ücret Karşılaştırıcı. Binance, Bybit, OKX, Coinbase, Kraken ve daha fazlasında maker/taker ücret dağılımıyla işlem komisyonlarını karşılaştırın.'
    },
    'crypto-loan-calculator': {
      title: 'Kripto Kredi Hesaplayıcı',
      description: 'Ücretsiz Kripto Kredi Hesaplayıcı. DeFi ve CeFi kredileri için kredi tutarını, faiz maliyetlerini, margin call eşiğini ve likidasyon riskini tahmin edin.'
    },
    'vesting-calculator': {
      title: 'Token Hak Ediş Hesaplayıcı',
      description: 'Ücretsiz Token Hak Ediş Hesaplayıcı. Cliff dönemleri, TGE kilidi açılışları ve aylık veya üç aylık vesting ile kilit açma takvimlerini görselleştirin.'
    },
    'nft-profit-calculator': {
      title: 'NFT Kar Hesaplayıcı',
      description: 'Ücretsiz NFT Kar Hesaplayıcı. OpenSea, Blur ve daha fazlasında pazar yeri komisyonları, yaratıcı telif hakları ve gas maliyetleri sonrası gerçek NFT işlem karını hesaplayın.'
    },
    'halving-calculator': {
      title: 'Bitcoin Halving Hesaplayıcı',
      description: 'Ücretsiz Bitcoin Halving Hesaplayıcı. Canlı geri sayım ile sonraki BTC halving madencilik gelirini nasıl etkiler, geçmiş veriler ve fiyat analiziyle görün.'
    },
    'mev-calculator': {
      title: 'MEV Koruma Hesaplayıcı',
      description: 'Ücretsiz MEV Koruma Hesaplayıcı. Swap boyutu ve slippage bazında sandwich ve frontrun riskini, MEV korumalı rotaların potansiyel tasarruflarını tahmin edin.'
    },
    'gamefi-calculator': {
      title: 'GameFi ROI Hesaplayıcı',
      description: 'Ücretsiz GameFi ROI Hesaplayıcı. Kurulum maliyeti, token ödülleri ve işletme giderlerine dayalı play-to-earn stratejileri için geri ödeme süresi ve yıllık ROI tahmin edin.'
    },
    'node-calculator': {
      title: 'Doğrulayıcı Düğüm Hesaplayıcı',
      description: 'Ücretsiz Doğrulayıcı Düğüm Hesaplayıcı. Stake miktarı, APR, komisyon, çalışma süresi ve altyapı maliyetlerini kullanarak validatör düğüm ekonomisini modelleyin.'
    },
    'salary-calculator': {
      title: 'Kripto Maaş Hesaplayıcı',
      description: 'Ücretsiz Kripto Maaş Hesaplayıcı. Fiat maaşınızı BTC, ETH veya USDT olarak dönüştürün. Ödeme sıklığı ve komisyon tahminleriyle zaman içinde kripto birikimini hesaplayın.'
    },
    'inflation-hedge': {
      title: 'Enflasyon Koruması Hesaplayıcı',
      description: 'Ücretsiz Enflasyon Koruması Hesaplayıcı. Kripto, stablecoin, altın ve S&P 500 performansını Türkiye, Arjantin, Nijerya, ABD ve daha fazlasında enflasyonla karşılaştırın.'
    },
  },
  'hi': {
    'converter': {
      title: 'क्रिप्टो कनवर्टर',
      description: 'मुफ्त क्रिप्टो कनवर्टर। Bitcoin, Ethereum और 500+ क्रिप्टो को USD, EUR और 10+ फिएट मुद्राओं में रियल-टाइम CoinGecko कीमतों के साथ कन्वर्ट करें।'
    },
    'profit-calculator': {
      title: 'क्रिप्टो प्रॉफिट कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो प्रॉफिट कैलकुलेटर। 500+ क्रिप्टोकरेंसी के लिए ROI, कुल शुल्क और शुद्ध लाभ देखने के लिए खरीद और बिक्री मूल्य दर्ज करें।'
    },
    'mining-calculator': {
      title: 'बिटकॉइन माइनिंग कैलकुलेटर',
      description: 'मुफ्त बिटकॉइन माइनिंग कैलकुलेटर। दैनिक, मासिक और वार्षिक BTC माइनिंग आय का अनुमान लगाने के लिए हैशरेट, बिजली खपत और लागत दर्ज करें।'
    },
    'dca-calculator': {
      title: 'DCA कैलकुलेटर',
      description: 'मुफ्त DCA कैलकुलेटर। Bitcoin, Ethereum और 500+ क्रिप्टो के लिए ऐतिहासिक डेटा के साथ नियमित निवेश रणनीतियों का अनुकरण करें, DCA बनाम एकमुश्त निवेश की तुलना करें।'
    },
    'tax-calculator': {
      title: 'क्रिप्टो टैक्स कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो टैक्स कैलकुलेटर। 17 देशों के लिए पूंजीगत लाभ कर का अनुमान लगाएं, भारत, अमेरिका, जर्मनी और अन्य देशों की दरों की तुलना करें।'
    },
    'what-if': {
      title: 'व्हाट इफ कैलकुलेटर',
      description: 'मुफ्त व्हाट इफ कैलकुलेटर। काल्पनिक क्रिप्टो प्रवेशों का अनुकरण करें, अवसर लागत का मूल्यांकन करें और वैकल्पिक निवेश परिणामों की तुलना करें।'
    },
    'position-size-calculator': {
      title: 'पोज़िशन साइज़ कैलकुलेटर',
      description: 'मुफ्त पोज़िशन साइज़ कैलकुलेटर। खाता बैलेंस, जोखिम सहनशीलता और स्टॉप-लॉस के आधार पर इष्टतम ट्रेड आकार निर्धारित करें। 125x तक लीवरेज।'
    },
    'liquidation-calculator': {
      title: 'लिक्विडेशन कैलकुलेटर',
      description: 'मुफ्त लिक्विडेशन प्राइस कैलकुलेटर। Binance, Bybit, OKX पर Isolated और Cross मार्जिन मोड में जानें कि आपकी पोज़ीशन कब लिक्विडेट होगी।'
    },
    'funding-rate-calculator': {
      title: 'फंडिंग रेट कैलकुलेटर',
      description: 'मुफ्त फंडिंग रेट कैलकुलेटर। लीवरेज्ड पोज़ीशन रखने की दैनिक, साप्ताहिक, मासिक और वार्षिक लागत की गणना करें।'
    },
    'tp-sl-calculator': {
      title: 'टेक प्रॉफिट / स्टॉप लॉस कैलकुलेटर',
      description: 'मुफ्त TP/SL कैलकुलेटर। R:R अनुपात, आंशिक TP और विज़ुअल प्राइस स्केल के साथ इष्टतम टेक-प्रॉफिट और स्टॉप-लॉस स्तर सेट करें।'
    },
    'margin-calculator': {
      title: 'मार्जिन कैलकुलेटर',
      description: 'मुफ्त मार्जिन कैलकुलेटर। Binance, Bybit और OKX के लिए आवश्यक मार्जिन, मार्जिन स्तर, फ्री मार्जिन और मार्जिन कॉल प्राइस की गणना करें।'
    },
    'pip-calculator': {
      title: 'पिप वैल्यू कैलकुलेटर',
      description: 'मुफ्त पिप वैल्यू कैलकुलेटर। BTC, ETH, SOL और 500+ कॉइन्स में किसी भी पोज़ीशन साइज़ के लिए प्राइस मूवमेंट का डॉलर मूल्य कैलकुलेट करें।'
    },
    'break-even-calculator': {
      title: 'ब्रेक-ईवन कैलकुलेटर',
      description: 'मुफ्त ब्रेक-ईवन कैलकुलेटर। जानें कि नुकसान से उबरने के लिए कितना लाभ चाहिए, या ट्रेडिंग फीस को कवर करने वाली एग्ज़िट प्राइस कैलकुलेट करें।'
    },
    'risk-reward-calculator': {
      title: 'रिस्क रिवॉर्ड कैलकुलेटर',
      description: 'मुफ्त रिस्क-रिवॉर्ड रेशियो कैलकुलेटर। R:R अनुपात, आवश्यक जीत दर की गणना करें और किसी भी सेटअप के लिए 100 ट्रेड सिमुलेशन चलाएं।'
    },
    'staking-calculator': {
      title: 'क्रिप्टो स्टेकिंग कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो स्टेकिंग कैलकुलेटर। वैलिडेटर कमीशन और टोकन प्राइस अनुमानों के बाद दैनिक, साप्ताहिक और वार्षिक स्टेकिंग रिवॉर्ड कैलकुलेट करें।'
    },
    'impermanent-loss-calculator': {
      title: 'इम्परमानेंट लॉस कैलकुलेटर',
      description: 'मुफ्त इम्परमानेंट लॉस कैलकुलेटर। AMM लिक्विडिटी पूल के लिए IL कैलकुलेट करें, LP रिटर्न बनाम HODL की तुलना करें और फीस कमाई का आकलन करें।'
    },
    'apy-apr-calculator': {
      title: 'APY vs APR कैलकुलेटर',
      description: 'मुफ्त APY vs APR कैलकुलेटर। APR और APY के बीच कन्वर्ट करें, कंपाउंडिंग फ्रीक्वेंसी की तुलना करें और DeFi यील्ड व स्टेकिंग की वास्तविक कमाई कैलकुलेट करें।'
    },
    'yield-farming-calculator': {
      title: 'यील्ड फार्मिंग कैलकुलेटर',
      description: 'मुफ्त यील्ड फार्मिंग कैलकुलेटर। गैस लागत, इम्परमानेंट लॉस और हार्वेस्ट फ्रीक्वेंसी सहित नेट DeFi फार्मिंग प्रॉफिट और वास्तविक APY कैलकुलेट करें।'
    },
    'gas-calculator': {
      title: 'क्रिप्टो गैस कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो गैस कैलकुलेटर। ट्रांजैक्शन कन्फर्म करने से पहले स्वैप, ट्रांसफर और DeFi एक्शन के लिए प्रमुख EVM नेटवर्क पर गैस लागत का अनुमान लगाएं।'
    },
    'uniswap-calculator': {
      title: 'यूनिस्वैप फीस कैलकुलेटर',
      description: 'मुफ्त यूनिस्वैप फीस कैलकुलेटर। LP फीस इनकम, इम्परमानेंट लॉस प्रभाव, ब्रेक-ईवन टाइम और पूल के नेट आउटकम का अनुमान लगाएं।'
    },
    'bridge-comparator': {
      title: 'ब्रिज कॉस्ट तुलनित्र',
      description: 'मुफ्त ब्रिज कॉस्ट तुलनित्र। L2 और मल्टीचेन ब्रिज में अनुमानित कुल शुल्क, गति और सुरक्षा स्कोर के अनुसार क्रिप्टो ब्रिज रूट की तुलना करें।'
    },
    'lending-calculator': {
      title: 'क्रिप्टो लेंडिंग कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो लेंडिंग कैलकुलेटर। APY, कंपाउंडिंग मॉडल, अवधि और प्लेटफॉर्म शुल्क का उपयोग करके अनुमानित लेंडिंग रिटर्न कैलकुलेट करें।'
    },
    'gpu-mining-calculator': {
      title: 'GPU माइनिंग कैलकुलेटर',
      description: 'मुफ्त GPU माइनिंग कैलकुलेटर। हैशरेट, बिजली खपत, बिजली दर और पूल फीस के साथ GPU माइनिंग लाभप्रदता का अनुमान लगाएं।'
    },
    'asic-mining-calculator': {
      title: 'ASIC माइनिंग कैलकुलेटर',
      description: 'मुफ्त ASIC माइनिंग कैलकुलेटर। प्रमुख हार्डवेयर मॉडलों के लिए ASIC माइनिंग लाभप्रदता, बिजली लागत और ब्रेक-ईवन अवधि कैलकुलेट करें।'
    },
    'mining-roi-calculator': {
      title: 'माइनिंग ROI कैलकुलेटर',
      description: 'मुफ्त माइनिंग ROI कैलकुलेटर। राजस्व, लागत और ब्रेक-ईवन टाइमिंग के लिए परिदृश्य विश्लेषण के साथ माइनिंग हार्डवेयर ROI मॉडल करें।'
    },
    'electricity-cost-calculator': {
      title: 'माइनिंग बिजली लागत कैलकुलेटर',
      description: 'मुफ्त माइनिंग बिजली लागत कैलकुलेटर। डिवाइस संख्या, पावर उपयोग, अपटाइम और स्थानीय ऊर्जा मूल्य के अनुसार बिजली खपत और संचालन लागत कैलकुलेट करें।'
    },
    'difficulty-calculator': {
      title: 'माइनिंग कठिनाई अनुमानक',
      description: 'मुफ्त माइनिंग कठिनाई अनुमानक। अगला डिफिकल्टी एडजस्टमेंट आपकी अनुमानित माइनिंग आय और लाभप्रदता को कैसे प्रभावित कर सकता है, इसका अनुमान लगाएं।'
    },
    'hashrate-converter': {
      title: 'हैशरेट कनवर्टर',
      description: 'मुफ्त हैशरेट कनवर्टर। H/s से EH/s तक माइनिंग हैशरेट यूनिट कन्वर्ट करें और ASIC व GPU हार्डवेयर के लिए सामान्य रेंज की तुलना करें।'
    },
    'market-cap-calculator': {
      title: 'मार्केट कैप कैलकुलेटर',
      description: 'मुफ्त मार्केट कैप कैलकुलेटर। मार्केट कैप और सप्लाई से टोकन प्राइस, या टोकन प्राइस से मार्केट कैप कैलकुलेट करें, लाइव क्रिप्टो डेटा के साथ।'
    },
    'market-cap-comparator': {
      title: 'मार्केट कैप तुलनित्र',
      description: 'मुफ्त मार्केट कैप तुलनित्र। किसी भी क्रिप्टो की शीर्ष कॉइन्स से तुलना करें। काल्पनिक कीमतें और ग्रोथ मल्टीप्लायर कैलकुलेट करें।'
    },
    'roi-calculator': {
      title: 'ROI कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो ROI कैलकुलेटर। कुल और वार्षिक ROI कैलकुलेट करें और S&P 500, गोल्ड और रियल एस्टेट के साथ प्रदर्शन की तुलना करें।'
    },
    'reverse-roi': {
      title: 'रिवर्स ROI कैलकुलेटर',
      description: 'मुफ्त रिवर्स ROI कैलकुलेटर। अपना निवेश और लक्ष्य लाभ दर्ज करें और आवश्यक टोकन प्राइस पता करें। ग्रोथ मल्टीप्लायर और माइलस्टोन टेबल शामिल।'
    },
    'hodl-vs-trade': {
      title: 'HODL बनाम ट्रेड कैलकुलेटर',
      description: 'मुफ्त HODL बनाम ट्रेड सिम्युलेटर। बाय-एंड-होल्ड की एक्टिव ट्रेडिंग से तुलना करें। कस्टम विन रेट, प्रॉफिट टारगेट और फीस के साथ ट्रेड सिमुलेट करें।'
    },
    'rebalancing-calculator': {
      title: 'पोर्टफोलियो रीबैलेंसिंग कैलकुलेटर',
      description: 'मुफ्त पोर्टफोलियो रीबैलेंसिंग कैलकुलेटर। लक्ष्य आवंटन के अनुसार अपने क्रिप्टो पोर्टफोलियो को रीबैलेंस करने के लिए खरीद/बिक्री एक्शन कैलकुलेट करें।'
    },
    'compound-calculator': {
      title: 'चक्रवृद्धि ब्याज कैलकुलेटर (क्रिप्टो)',
      description: 'मुफ्त चक्रवृद्धि ब्याज कैलकुलेटर। स्टेकिंग, यील्ड फार्मिंग और सेविंग्स के लिए नियमित योगदान के साथ चक्रवृद्धि वृद्धि का अनुमान लगाएं।'
    },
    'ico-roi-calculator': {
      title: 'ICO / IDO ROI कैलकुलेटर',
      description: 'मुफ्त ICO/IDO ROI कैलकुलेटर। टोकन राशि, एंट्री प्राइस और मार्केट प्राइस का उपयोग करके ICO या IDO आवंटन के लिए वर्तमान और ATH ROI कैलकुलेट करें।'
    },
    'airdrop-calculator': {
      title: 'एयरड्रॉप वैल्यू कैलकुलेटर',
      description: 'मुफ्त एयरड्रॉप वैल्यू कैलकुलेटर। प्राप्त क्रिप्टो एयरड्रॉप का मूल्य कैलकुलेट करें, कर दायित्व का अनुमान लगाएं और फीस के बाद लाभ या हानि ट्रैक करें।'
    },
    'satoshi-converter': {
      title: 'सातोशी कनवर्टर',
      description: 'मुफ्त सातोशी कनवर्टर। Bitcoin, Satoshi और USD/EUR के बीच तुरंत कन्वर्ट करें। प्रति डॉलर sats, क्विक रेफरेंस टेबल और लाइव BTC प्राइस देखें।'
    },
    'gwei-converter': {
      title: 'ग्वेई कनवर्टर',
      description: 'मुफ्त ग्वेई कनवर्टर। लाइव ETH प्राइस और Ethereum ट्रांजैक्शन के लिए व्यावहारिक गैस लागत उदाहरणों के साथ Wei, Gwei और Ether यूनिट तुरंत कन्वर्ट करें।'
    },
    'timestamp-converter': {
      title: 'यूनिक्स टाइमस्टैम्प कनवर्टर',
      description: 'मुफ्त यूनिक्स टाइमस्टैम्प कनवर्टर। UTC/लोकल डिस्प्ले और ब्लॉक-टाइम अनुमान के साथ Unix timestamp को तारीख/समय और तारीख/समय को Unix में कन्वर्ट करें।'
    },
    'unit-converter': {
      title: 'क्रिप्टो यूनिट कनवर्टर',
      description: 'मुफ्त क्रिप्टो यूनिट कनवर्टर। BTC, ETH, SOL और USDT के लिए satoshi, gwei, lamport और micro यूनिट सहित डिनॉमिनेशन यूनिट कन्वर्ट करें।'
    },
    'exchange-fees': {
      title: 'एक्सचेंज फीस तुलनित्र',
      description: 'मुफ्त एक्सचेंज फीस तुलनित्र। Binance, Bybit, OKX, Coinbase, Kraken और अन्य में maker/taker फीस ब्रेकडाउन के साथ ट्रेडिंग शुल्क की तुलना करें।'
    },
    'crypto-loan-calculator': {
      title: 'क्रिप्टो लोन कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो लोन कैलकुलेटर। DeFi और CeFi लोन के लिए लोन राशि, ब्याज लागत, मार्जिन कॉल थ्रेशोल्ड और लिक्विडेशन रिस्क का अनुमान लगाएं।'
    },
    'vesting-calculator': {
      title: 'टोकन वेस्टिंग कैलकुलेटर',
      description: 'मुफ्त टोकन वेस्टिंग कैलकुलेटर। क्लिफ पीरियड, TGE अनलॉक और मासिक या तिमाही वेस्टिंग के साथ अनलॉक शेड्यूल विज़ुअलाइज़ करें।'
    },
    'nft-profit-calculator': {
      title: 'NFT प्रॉफिट कैलकुलेटर',
      description: 'मुफ्त NFT प्रॉफिट कैलकुलेटर। OpenSea, Blur और अन्य पर मार्केटप्लेस फीस, क्रिएटर रॉयल्टी और गैस लागत के बाद वास्तविक NFT ट्रेडिंग प्रॉफिट कैलकुलेट करें।'
    },
    'halving-calculator': {
      title: 'बिटकॉइन हाल्विंग कैलकुलेटर',
      description: 'मुफ्त बिटकॉइन हाल्विंग कैलकुलेटर। लाइव काउंटडाउन टाइमर के साथ देखें कि अगला BTC हाल्विंग ऐतिहासिक डेटा और प्राइस विश्लेषण से माइनिंग आय को कैसे प्रभावित करेगा।'
    },
    'mev-calculator': {
      title: 'MEV प्रोटेक्शन कैलकुलेटर',
      description: 'मुफ्त MEV प्रोटेक्शन कैलकुलेटर। स्वैप साइज़ और स्लिपेज के आधार पर सैंडविच और फ्रंटरन जोखिम, तथा MEV प्रोटेक्शन रूट से संभावित बचत का अनुमान लगाएं।'
    },
    'gamefi-calculator': {
      title: 'गेमफाई ROI कैलकुलेटर',
      description: 'मुफ्त गेमफाई ROI कैलकुलेटर। सेटअप लागत, टोकन रिवॉर्ड और संचालन खर्चों के आधार पर प्ले-टू-अर्न रणनीतियों के लिए पेबैक पीरियड और वार्षिक ROI का अनुमान।'
    },
    'node-calculator': {
      title: 'वैलिडेटर नोड कैलकुलेटर',
      description: 'मुफ्त वैलिडेटर नोड कैलकुलेटर। स्टेक राशि, APR, कमीशन, अपटाइम और इन्फ्रास्ट्रक्चर लागत का उपयोग करके वैलिडेटर नोड इकोनॉमिक्स मॉडल करें।'
    },
    'salary-calculator': {
      title: 'क्रिप्टो सैलरी कैलकुलेटर',
      description: 'मुफ्त क्रिप्टो सैलरी कैलकुलेटर। अपनी फिएट सैलरी को BTC, ETH या USDT में कन्वर्ट करें। भुगतान आवृत्ति और फीस अनुमान के साथ समय के साथ क्रिप्टो संचय कैलकुलेट करें।'
    },
    'inflation-hedge': {
      title: 'मुद्रास्फीति बचाव कैलकुलेटर',
      description: 'मुफ्त मुद्रास्फीति बचाव कैलकुलेटर। तुर्की, अर्जेंटीना, नाइजीरिया, अमेरिका और अन्य देशों में मुद्रास्फीति के खिलाफ क्रिप्टो, स्टेबलकॉइन, गोल्ड और S&P 500 की तुलना करें।'
    },
  },
  'ru': {
    'converter': {
      title: 'Конвертер криптовалют',
      description: 'Бесплатный конвертер криптовалют. Конвертируйте Bitcoin, Ethereum и 500+ криптовалют в USD, EUR и 10+ фиатных валют с ценами CoinGecko в реальном времени.'
    },
    'profit-calculator': {
      title: 'Калькулятор прибыли криптовалют',
      description: 'Бесплатный калькулятор прибыли. Введите цены покупки и продажи, чтобы увидеть ROI, общие комиссии и чистую прибыль для 500+ криптовалют.'
    },
    'mining-calculator': {
      title: 'Калькулятор майнинга биткоина',
      description: 'Бесплатный калькулятор майнинга биткоина. Введите хешрейт, энергопотребление и стоимость электричества для оценки дневного, месячного и годового дохода в BTC.'
    },
    'dca-calculator': {
      title: 'Калькулятор DCA',
      description: 'Бесплатный DCA-калькулятор для Bitcoin, Ethereum и 500+ криптовалют. Симулируйте стратегии усреднения с историческими данными, сравните DCA и единовременное вложение.'
    },
    'tax-calculator': {
      title: 'Калькулятор налогов на криптовалюту',
      description: 'Бесплатный калькулятор криптоналогов для 17 стран. Оцените налог на прирост капитала, сравните краткосрочные и долгосрочные ставки для США, России и других.'
    },
    'what-if': {
      title: 'Калькулятор Если бы',
      description: 'Бесплатный калькулятор «Что если». Симулируйте гипотетические входы в крипто, оцените альтернативную стоимость и сравните результаты альтернативных инвестиций.'
    },
    'position-size-calculator': {
      title: 'Калькулятор размера позиции',
      description: 'Бесплатный калькулятор размера позиции. Определите оптимальный размер сделки на основе баланса, допустимого риска и стоп-лосса. Поддержка кредитного плеча до 125x.'
    },
    'liquidation-calculator': {
      title: 'Калькулятор ликвидации',
      description: 'Бесплатный калькулятор цены ликвидации для криптофьючерсов. Поддержка Binance, Bybit, OKX с режимами Isolated и Cross маржи.'
    },
    'funding-rate-calculator': {
      title: 'Калькулятор ставки фондирования',
      description: 'Бесплатный калькулятор ставки фондирования для бессрочных фьючерсов. Рассчитайте дневную, недельную, месячную и годовую стоимость удержания позиции с плечом.'
    },
    'tp-sl-calculator': {
      title: 'Калькулятор Тейк-Профит / Стоп-Лосс',
      description: 'Бесплатный TP/SL-калькулятор. Установите оптимальные уровни тейк-профит и стоп-лосс с соотношением R:R, частичными TP и визуальной шкалой цен.'
    },
    'margin-calculator': {
      title: 'Калькулятор маржи',
      description: 'Бесплатный калькулятор маржи для криптофьючерсов. Рассчитайте требуемую маржу, уровень маржи, свободную маржу и цену маржин-колла на Binance, Bybit и OKX.'
    },
    'pip-calculator': {
      title: 'Калькулятор стоимости пункта (Пип/Тик)',
      description: 'Бесплатный калькулятор стоимости пипа. Рассчитайте долларовую стоимость движения цены для любого размера позиции по BTC, ETH, SOL и 500+ монетам.'
    },
    'break-even-calculator': {
      title: 'Калькулятор безубыточности',
      description: 'Бесплатный калькулятор безубыточности. Узнайте, какой рост нужен для восстановления после убытка, или рассчитайте цену выхода, покрывающую торговые комиссии.'
    },
    'risk-reward-calculator': {
      title: 'Калькулятор соотношения риска и прибыли',
      description: 'Бесплатный калькулятор соотношения риск/прибыль. Рассчитайте коэффициент R:R, необходимый процент выигрыша и симулируйте 100 сделок для любой стратегии.'
    },
    'staking-calculator': {
      title: 'Калькулятор стейкинга',
      description: 'Бесплатный калькулятор стейкинга. Рассчитайте дневные, недельные и годовые награды стейкинга с учётом комиссии валидатора и прогнозов цены токена.'
    },
    'impermanent-loss-calculator': {
      title: 'Калькулятор непостоянных потерь',
      description: 'Бесплатный калькулятор непостоянных потерь для DeFi. Рассчитайте IL для AMM-пулов, сравните доход LP vs HODL и оцените, покрывают ли комиссии убыток.'
    },
    'apy-apr-calculator': {
      title: 'Калькулятор APY и APR',
      description: 'Бесплатный калькулятор APY vs APR. Конвертируйте между APR и APY, сравните частоту начисления и рассчитайте реальный доход от DeFi-yield и стейкинга.'
    },
    'yield-farming-calculator': {
      title: 'Калькулятор фарминга доходности',
      description: 'Бесплатный калькулятор фарминга. Рассчитайте чистую прибыль DeFi-фарминга с учётом газа, непостоянных потерь и частоты сбора для определения реального APY.'
    },
    'gas-calculator': {
      title: 'Калькулятор газа криптовалют',
      description: 'Бесплатный калькулятор газа. Оцените стоимость газа на основных EVM-сетях для свопов, переводов и DeFi-операций перед подтверждением транзакций.'
    },
    'uniswap-calculator': {
      title: 'Калькулятор комиссий Uniswap',
      description: 'Бесплатный калькулятор комиссий Uniswap. Оцените доход LP от комиссий, влияние непостоянных потерь, время окупаемости и чистый результат пула.'
    },
    'bridge-comparator': {
      title: 'Сравнение стоимости мостов (Bridge)',
      description: 'Бесплатное сравнение стоимости мостов. Сравните маршруты криптомостов по общей комиссии, скорости и оценке безопасности среди L2 и мультичейн-мостов.'
    },
    'lending-calculator': {
      title: 'Калькулятор крипто-кредитования (Лендинг)',
      description: 'Бесплатный калькулятор крипто-лендинга. Рассчитайте прогнозируемый доход от кредитования с учётом APY, модели начисления, срока и комиссий платформы.'
    },
    'gpu-mining-calculator': {
      title: 'Калькулятор майнинга на видеокартах (GPU)',
      description: 'Бесплатный калькулятор GPU-майнинга. Оцените рентабельность майнинга на видеокартах с учётом хешрейта, энергопотребления, тарифов и комиссий пула.'
    },
    'asic-mining-calculator': {
      title: 'Калькулятор ASIC-майнинга',
      description: 'Бесплатный калькулятор ASIC-майнинга. Рассчитайте рентабельность ASIC-майнинга, стоимость электричества и срок окупаемости для ведущих моделей оборудования.'
    },
    'mining-roi-calculator': {
      title: 'Калькулятор окупаемости майнинга (ROI)',
      description: 'Бесплатный калькулятор ROI майнинга. Моделируйте возврат инвестиций в оборудование с анализом сценариев для дохода, расходов и точки безубыточности.'
    },
    'electricity-cost-calculator': {
      title: 'Калькулятор стоимости электроэнергии для майнинга',
      description: 'Бесплатный калькулятор электроэнергии для майнинга. Рассчитайте энергопотребление и эксплуатационные расходы по количеству устройств, мощности и местному тарифу.'
    },
    'difficulty-calculator': {
      title: 'Калькулятор сложности майнинга',
      description: 'Бесплатный калькулятор сложности. Оцените, как следующая корректировка сложности может повлиять на прогнозируемый доход и рентабельность вашего майнинга.'
    },
    'hashrate-converter': {
      title: 'Конвертер хешрейта',
      description: 'Бесплатный конвертер хешрейта. Конвертируйте единицы хешрейта от H/s до EH/s и сравните типичные диапазоны для ASIC и GPU оборудования.'
    },
    'market-cap-calculator': {
      title: 'Калькулятор рыночной капитализации',
      description: 'Бесплатный калькулятор рыночной капитализации. Рассчитайте цену токена по капитализации и объёму, или капитализацию по цене, с актуальными крипто-данными.'
    },
    'market-cap-comparator': {
      title: 'Сравнение рыночной капитализации',
      description: 'Бесплатное сравнение рыночной капитализации. Сравните любую криптовалюту с топ-монетами. Рассчитайте гипотетические цены и мультипликаторы роста.'
    },
    'roi-calculator': {
      title: 'Калькулятор ROI (рентабельности)',
      description: 'Бесплатный калькулятор ROI с годовой доходностью. Рассчитайте общий и годовой ROI и сравните результат с S&P 500, золотом и недвижимостью.'
    },
    'reverse-roi': {
      title: 'Калькулятор обратного ROI',
      description: 'Бесплатный калькулятор обратного ROI. Введите инвестицию и целевую прибыль, чтобы найти нужную цену токена. Мультипликатор роста и таблица вех.'
    },
    'hodl-vs-trade': {
      title: 'Калькулятор HODL vs Трейдинг',
      description: 'Бесплатный симулятор HODL vs Трейдинг. Сравните стратегию удержания с активной торговлей. Симулируйте сделки с процентом побед, целями прибыли и комиссиями.'
    },
    'rebalancing-calculator': {
      title: 'Калькулятор ребалансировки портфеля',
      description: 'Бесплатный калькулятор ребалансировки портфеля. Рассчитайте действия покупки/продажи для ребалансировки вашего криптопортфеля к целевым распределениям.'
    },
    'compound-calculator': {
      title: 'Калькулятор сложного процента (Крипто)',
      description: 'Бесплатный калькулятор сложного процента. Спрогнозируйте рост капитала для стейкинга, фарминга и сбережений с регулярными взносами.'
    },
    'ico-roi-calculator': {
      title: 'Калькулятор ROI для ICO / IDO',
      description: 'Бесплатный калькулятор ROI для ICO/IDO. Рассчитайте текущий и ATH ROI для аллокаций ICO или IDO по количеству токенов, цене входа и рыночным ценам.'
    },
    'airdrop-calculator': {
      title: 'Калькулятор стоимости аирдропа',
      description: 'Бесплатный калькулятор стоимости аирдропа. Рассчитайте стоимость полученных криптоаирдропов, оцените налоговые обязательства и отслеживайте прибыль или убыток.'
    },
    'satoshi-converter': {
      title: 'Конвертер сатоши',
      description: 'Бесплатный конвертер сатоши. Мгновенно конвертируйте между Bitcoin, сатоши и USD/EUR. Сатоши за доллар, таблицы быстрого справочника и курс BTC в реальном времени.'
    },
    'gwei-converter': {
      title: 'Конвертер Gwei',
      description: 'Бесплатный конвертер Gwei. Мгновенно конвертируйте единицы Wei, Gwei и Ether с актуальной ценой ETH и примерами стоимости газа для транзакций Ethereum.'
    },
    'timestamp-converter': {
      title: 'Конвертер Unix времени (Timestamp)',
      description: 'Бесплатный конвертер Unix времени. Конвертируйте Unix timestamp в дату/время и обратно с отображением UTC/локального времени и оценкой времени блока.'
    },
    'unit-converter': {
      title: 'Конвертер крипто-единиц',
      description: 'Бесплатный конвертер крипто-единиц. Конвертируйте единицы для BTC, ETH, SOL и USDT, включая сатоши, gwei, lamport и микро-единицы.'
    },
    'exchange-fees': {
      title: 'Сравнение комиссий бирж',
      description: 'Бесплатное сравнение комиссий бирж. Сравните торговые комиссии на Binance, Bybit, OKX, Coinbase, Kraken и других с разбивкой мейкер/тейкер.'
    },
    'crypto-loan-calculator': {
      title: 'Калькулятор крипто-ссуд',
      description: 'Бесплатный калькулятор криптозаймов. Оцените сумму кредита, процентные расходы, порог маржин-колла и риск ликвидации для DeFi и CeFi кредитов.'
    },
    'vesting-calculator': {
      title: 'Калькулятор вестинга токенов',
      description: 'Бесплатный калькулятор вестинга. Визуализируйте графики разблокировки с периодами клиффа, TGE и ежемесячным или квартальным вестингом.'
    },
    'nft-profit-calculator': {
      title: 'Калькулятор прибыли NFT',
      description: 'Бесплатный калькулятор прибыли NFT. Рассчитайте реальную прибыль от торговли NFT после комиссий маркетплейса, роялти создателя и стоимости газа на OpenSea, Blur и др.'
    },
    'halving-calculator': {
      title: 'Калькулятор халвинга биткоина',
      description: 'Бесплатный калькулятор халвинга с живым обратным отсчётом. Узнайте, как следующий халвинг BTC повлияет на доход от майнинга, с историей и анализом цен.'
    },
    'mev-calculator': {
      title: 'Калькулятор защиты от MEV',
      description: 'Бесплатный калькулятор защиты от MEV. Оцените риск сэндвич- и фронтран-атак и потенциальную экономию от маршрутов с MEV-защитой по размеру свопа и slippage.'
    },
    'gamefi-calculator': {
      title: 'Калькулятор ROI в GameFi',
      description: 'Бесплатный калькулятор ROI в GameFi. Оцените срок окупаемости и годовой ROI для play-to-earn стратегий на основе стоимости настройки, наград и расходов.'
    },
    'node-calculator': {
      title: 'Калькулятор валидаторной ноды',
      description: 'Бесплатный калькулятор валидаторной ноды. Моделируйте экономику валидатора с учётом суммы стейка, APR, комиссии, аптайма и затрат на инфраструктуру.'
    },
    'salary-calculator': {
      title: 'Калькулятор зарплаты в криптовалюте',
      description: 'Бесплатный калькулятор криптозарплаты. Конвертируйте фиатную зарплату в BTC, ETH или USDT. Рассчитайте накопление крипто с частотой выплат и комиссиями.'
    },
    'inflation-hedge': {
      title: 'Калькулятор хеджирования инфляции',
      description: 'Бесплатный калькулятор хеджирования инфляции. Сравните крипто, стейблкоины, золото и S&P 500 с инфляцией в Турции, Аргентине, Нигерии, США и других странах.'
    },
  },
};
