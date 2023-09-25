package com.bookstore.dao;

import org.springframework.data.repository.CrudRepository;

import com.bookstore.entity.OrderDetail;
import com.bookstore.entity.User;

import java.util.List;

public interface OrderDetailDao extends CrudRepository<OrderDetail, Integer> {
    public List<OrderDetail> findByUser(User user);

    public List<OrderDetail> findByOrderStatus(String status);
}
