---
sidebar_position: 1
---

# Cashlez Link

## Introduction

Cashlez Link adalah layanan integrasi pembayaran online yang disediakan oleh PT Cashlez Worldwide Indonesia Tbk. Layanan ini memungkinkan merchant untuk memproses transaksi langsung melalui website mereka tanpa menggunakan perangkat Electronic Data Capture (EDC). Cashlez Link mendukung berbagai metode pembayaran, termasuk kartu kredit/debit, virtual account, dan QRIS. Setelah transaksi diproses, sistem akan secara otomatis mengembalikan hasil transaksi (berhasil/gagal) ke sistem merchant.

## Integration Flow

Integrasi ini akan melibatkan beberapa entitas, termasuk Pelanggan (Customer), Web Merchant, dan Sistem cashUP, yang semuanya dapat dilihat secara detail pada diagram di bawah ini:

![cashlez link flow](./img/flow-czlink.png)

## API Service

Environment ini digunakan untuk Production.
<table>
  <tbody>
    <tr>
      <th>Path</th>
      <td>`/MmCorePsgsHost/v1/login`</td>
    </tr>
  </tbody>
</table>
### Login

Login digunakan untuk mengidentifikasi pengguna dan mendapatkan token untuk digunakan pada permintaan lainnya.
<table>
  <tbody>
    <tr>
      <th>Path</th>
      <td>`/MmCorePsgsHost/v1/login`</td>
    </tr>
    <tr>
      <th>Method</th>
      <td>`POST`</td>
    </tr>
  </tbody>
</table> 

#### I. Request

Parameter body request untuk Login.

| Param | Option | Type | Description |
| :--- | :--- | :--- | :--- |
| `device_timestamp` | M | String | Timestamp dengan format epoch |
| `pass_hash` | M | String | Hash password |
| `username` | M | String | Disediakan oleh Cashlez |

**Contoh JSON:**
```json title='JSON'
{
  "device_timestamp": "1727074822288",
  "pass_hash": "0d4ea8e76e721becf931c9a44ea07eaac892c21f5e1b7348501bf9c8b90f17dc",
  "username": "USERNAME"
}
```

Nilai hash password adalah gabungan dengan formula ini:
1.  Plaintext -> MD5 Encrypted Source
2.  Timestamp -> Epoch Source
3.  Timestamp [Epoch] + MD5 Encrypted → SHA-256 Encrypted Source

**Example of Password hash:**
* Plaintext = **123456**
* MD5 Encrypted = e10adc3949ba59abbe56e057f20f883e
* Timestamp = Monday, 7 July 2025 12:58:21.152 GMT → 1751867901152
* **Password Hash (SHA-256)** = 1751867901152e10adc3949ba59abbe56e057f20f883e → **28d92cb91eb5db7e4884374b65ab7f13e45d93a375c66ee99086dd03c444412f**  
*ini adalah nilai password hash kamu*

#### II. Response

Berikut adalah data response dari Login:

| Param | Data Type | Description |
| :--- | :--- | :--- |
| `response_code` | String | Response Code |
| `merchant_address2` | String | Address 2 |
| `merchant_address1` | String | Address 1 |
| `midware_timestamp` | String | Timestamp proses dalam format epoch |
| `merchant_name` | String | Merchant Name |
| `merchant_id` | Integer | Merchant Identifier |
| `message` | String | Pesan terkait hasil pemrosesan |
| `version.crypto_ver` | String | Versi library kriptografi yang digunakan |
| `version.psgs_ver` | String | Versi Payment Switching Gateway Service |
| `token` | String | JWT authentication token |
| `container_name` | String | Docker Info |
| `print_receipt_merchant_name` | String | Nama merchant yang akan dicetak di struk |
| `print_receipt_address_line_2` | String | Baris alamat kedua di struk |
| `print_receipt_address_line_1` | String | Baris alamat pertama di struk |
| `status` | String | Response status |

**Example Response for Login:**
```json title="JSON"
{
  "response_code": "0000",
  "merchant_address2": "No.199",
  "merchant_address1": "Jl. Bendungan",
  "midware_timestamp": "1754581373",
  "merchant_name": "BNI Test",
  "merchant_id": 111,
  "message": "LOGIN SUCCESS.",
  "version": {
    "crypto_ver": "v1.5.0",
    "psgs_ver": "v1.0.1"
  },
  "token": "eyJhbGci0iJIUzUxMiJ9.eyJzdWIi0iJkZXYtdGVzdCIsImlzcyI6Imh0dHA6Ly9jb3J1LXBzZ3MtcGxhaW4vTW1Db3J1UHNnc0hvc3QvdjEvbG9naW4iLCJpYXQi0jE3NTQ10DEzNzMsImV4cCI6MTc2MjUzMDE3M30.dZM4sGuNMtvI8NwWhK2ni-04KPxNWE9DZgrW9gy7JLStSWvRSmVwLb9R5wPU1Y18CiTkcaFdZ0KYvsXVjODIUw",
  "container_name": "cz-stag.drc.tocus-dev.docker",
  "print_receipt_merchant_name": "BNI Test",
  "print_receipt_address_line_2": "No.199",
  "print_receipt_address_line_1": "Jl. Bendungan",
  "status": "OK"
}
```

### Generate Link

API Generate Link digunakan untuk memulai transaksi pembayaran dengan menghasilkan link pembayaran. API ini memungkinkan sistem merchant untuk membuat pesanan pembayaran online, di mana responsnya akan mencakup detail penting seperti link yang dihasilkan, order_id, mata uang, dll.

<!-- <table>
  <tbody>
    <tr>
      <th>Path</th>
      <td>`/MmCoreCzLinkHost/api/v1/generate`</td>
    </tr>
    <tr>
      <th>Method</th>
      <td>`POST`</td>
    </tr>
    <tr>
      <table>
        <th>Header</th>
        <tr>
            <th>
                Key
            </th>
            <th>
                Value
            </th>
        </tr>
        <tr>
            <td>
              Authorization
            </td>
            <td>
              JWT Token from Login response
            </td>
        </tr>
      </table>
    </tr>
  </tbody>
</table> -->

<table>
  <tbody>
    <tr>
      <th>Path</th>
      <td>`/MmCoreCzLinkHost/api/v1/generate`</td>
    </tr>
    <tr>
      <th>Method</th>
      <td>`POST`</td>
    </tr>
    <tr>
      <th>Header</th>
      <td>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Authorization</td>
              <td>JWT Token from Login response</td>
            </tr>
            </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>

#### I. Request

Parameter body request untuk Generate Link.

| Param | Option | Data Type | Description |
| :--- | :--- | :--- | :--- |
| `device_id` | M | String | Device Identifier, disediakan oleh cashlez |
| `device_timestamp` | M | String | Timestamp dengan format epoch |
| `base_amount` | M | Integer | Total jumlah transaksi |
| `currency` | M | String | Tipe mata uang untuk transaksi. Value: IDR |
| `customer_name` | M | String | Customer Name |
| `phone_no` | M | String | Phone Number |
| `reference_id` | Ο | String | Reference ID adalah order ID dari POS Merchant |
| `callback_url` | | String | Callback URL dari Merchant |
| `redirect_url` | O | String | URL redirect digunakan untuk mengarahkan pelanggan ke halaman yang diinginkan setelah pembayaran selesai. <br /> URL ini akan dikirim oleh cashUP dengan path param (status, referenceId, orderId). <br /> URL final akan terlihat seperti ini: `https://www.domain.com/YOUR_PATH?status={VALUE}&referenceId={VALUE}&orderId={VALUE}` |

**Contoh JSON:**
```json title='JSON'
{
  "device_id": "P653200052395",
  "device_timestamp": "1756886863",
  "base_amount": 20000,
  "currency": "IDR",
  "customer_name": "Good Customer",
  "phone_no": "08583123456789",
  "reference_id": "REFF-12345678910",
  "callback_url": "[https://www.domain.com/YOUR_PATH](https://www.domain.com/YOUR_PATH)",
  "redirect_url": "[https://www.domain.com/YOUR_PATH](https://www.domain.com/YOUR_PATH)"
}
```

#### II. Response

Berikut adalah parameter body response untuk Generate Payment.

| Param | Data Type | Description |
| :--- | :--- | :--- |
| `status` | String | Response status |
| `response_code` | String | Response Code |
| `message` | String | Response Message |
| `data.invoice_num` | Integer | Invoice Number untuk transaksi |
| `data.base_amount` | String | Total jumlah transaksi |
| `data.generated_link` | String | Informasi tentang link web payment |
| `data.order_id` | String | Unique ID dari cashUP |
| `data.currency` | String | Tipe mata uang untuk transaksi. Value: IDR |
| `data.customer_name` | String | |
| `midware_timestamp` | String | Timestamp proses dalam format epoch |

**Example Response for Generate Payment:**
```json title='JSON'
{
  "status": "SUCCESS",
  "response_code": "0000",
  "message": "SUCCESS TO GENERATE PAYMENT LINK.",
  "data": {
    "invoice_num": 47,
    "base_amount": 1000,
    "generated_link": "[https://link.cashup.id/payment/tyo_47_20250924141155](https://link.cashup.id/payment/tyo_47_20250924141155)",
    "order_id": "tyo_47_20250924141155",
    "currency": "IDR",
    "customer_name": "Don Pablo"
  },
  "midware_timestamp": "1758697915795"
}
```

### Payment Status

API Check Payment Status digunakan untuk memverifikasi apakah pembayaran yang sebelumnya dibuat telah berhasil diselesaikan atau masih tertunda.

<table>
  <tbody>
    <tr>
      <th>Path</th>
      <td>`/MmCoreCzLinkHost/internal/payment/status/{order_id}`</td>
    </tr>
    <tr>
      <th>Method</th>
      <td>`GET`</td>
    </tr>
  </tbody>
</table> 

#### I. Response

Berikut adalah parameter body response untuk Check Payment Status.

| Param | Data Type | Description |
| :--- | :--- | :--- |
| `status` | String | Response status |
| `response_code` | String | Response Code |
| `message` | String | Response Message |
| `data.trx_type` | String | Informasi tentang tipe transaksi |
| `data.issuer` | String | Nama issuer (hanya untuk QRIS) |
| `data.payment_link_status` | String | Informasi Status Pembayaran |
| `data.redirect_url` | String | Redirect URL |
| `data.reference_id` | String | Reference Id |
| `data.amount` | String | Total Jumlah Transaksi |
| `data.username` | String | Username yang generate payment |
| `data.merchant.merchant_id` | Integer | Merchant identifier |
| `data.merchant.merchant_name` | String | Informasi tentang nama merchant |
| `data.merchant.merchant_address1` | String | Merchant Address Line 1 |
| `data.merchant.merchant_address2` | String | Merchant Address Line 2 |
| `midware_timestamp` | String | Timestamp proses dalam format epoch |

**Example Response:**
```json title='JSON'
{
  "status": "SUCCESS",
  "response_code": "0011",
  "message": "PAYMENT ALREADY PAID.",
  "data": {
    "trx_type": "QRIS",
    "issuer": "Bank Jago",
    "redirect_url": "[https://domain.com/YOUR_PATH](https://domain.com/YOUR_PATH)",
    "reference_id": "RC-1133",
    "payment_link_status": "PAID",
    "amount": 3,
    "username": "tyo",
    "merchant": {
      "merchant_id": 25,
      "merchant_name": "Tyo",
      "merchant_address_1": "ATRIA SUDIRMAN Lantai 23",
      "merchant_address_2": "Tanah Abang, Jakarta Pusat"
    }
  },
  "midware_timestamp": "1762252814655"
}
```

### Callback Payment

Callback digunakan untuk memberikan notifikasi ke Partner setelah transaksi diproses.

#### I. Flow Callback Payment
1.  Partner menyelesaikan proses pembayaran.
2.  Sistem Cashlez mengirimkan permintaan callback ke endpoint partner, contoh:
    `https://webhook.site/674db8cb-baee-431d-89b4-9fc673e1bf56/callback`
    * Format request adalah `callback_request` + `/callback`.
3.  Request dikirim dengan header yang berisi `api-secret` dan `partnerld`.

#### II. Header Callback Payment & Example Request

| Key | Value |
| :--- | :--- |
| `api-secret` | Hasil hashing menggunakan SHA512, dengan format `partnerld` + `apiKey`. <br /> Contoh: <br /> - `partnerld`: 12345 <br /> - `apiKey`: 2256097 <br /> - `api-secret` (SHA-512) = 123452256097 -> 7fa181...bbe21dd <br /> *this is your api-secret value |
| `partnerld` | Disediakan oleh cashlez |

**Example Request Body:**
```json title='JSON'
{
  "created_date": "2025-11-07 10:54:41",
  "payment_date": "2025-11-07 10:55:56",
  "response_code": "0011",
  "trx_type": "QRIS",
  "issuer": "GOPAY",
  "payment_link_status": "PAID",
  "payment_link_message": "PAYMENT ALREADY PAID.",
  "amount": 1,
  "username": "tyo",
  "merchant": {
    "merchant_id": 25,
    "merchant_name": "Tyo",
    "merchant_address_1": "ATRIA SUDIRMAN Lantai 23",
    "merchant_address_2": "Tanah Abang, Jakarta Pusat"
  },
  "order_id": "bf1f6feb-96c1-4bee-a120-d62a470887df",
  "payment_detail": {
    "qris": {
      "qr_string": "00020101021226670015COM.CASHLEZ.WWW011893600839083861154702153636557365243710303UKE51370014ID.CO.QRIS.WWW0215ID2023304913957520458145303360540115802ID5903Tyo6013JAKARTA BARAT61051147062380122DSRT17624877384780470207083675662663046B33"
    }
  },
  "qr_pay_app_name": "CASHLEZ",
  "base_amount": 1,
  "invoice_num": "001007",
  "va": null,
  "cnp": null,
  "device_id": "P653200052395",
  "device_timestamp": "1756886863",
  "reference_id": "RC-1133"
}
```

## Layout Preview

Berikut adalah layout halaman pertama untuk memilih channel pembayaran:

![cashlez link flow](./img/choose-payement-channel.png)

Berikut adalah layout untuk pembayaran QRIS:

![cashlez link flow](./img/qris-page.png)

Berikut adalah layout untuk Pembayaran Kartu (Card Payment):
![Layout Pembayaran Kartu](./img/layout-card-payment.png)

Berikut adalah layout untuk pembayaran Virtual Account:
![Layout Pembayaran Virtual Account](./img/layout-virtual-account.png)

Berikut adalah layout untuk Pembayaran Sukses:
![Layout Pembayaran Sukses](./img/layout-success.png)

Berikut adalah layout untuk Link Pembayaran Kadaluarsa (Expired):
![Layout Link Kadaluarsa](./img/layout-expired.png)